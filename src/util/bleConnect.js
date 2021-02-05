(function (global) {
    function BleConnect (options) {
        var op = options || {};
        this.serviceId = op.serviceId || ''; // 蓝牙协议ID
        this.characteristicId = op.characteristicId || ''; // 蓝牙协议读取ID
        this.writeCharacteristicId = op.writeCharacteristicId || ''; // 蓝牙协议写入ID
        this.status = 0; // 0：初始未连接状态 1：连接中 2：已连接 3: 连接超时
        this.watchStatus = op.watchStatus;

        this.isIOS = false;
        this.deviceId = '';
        this.iosDeviceId = '';
        this.timer = null;
        this.isBleAdapterClosed = false;

        Object.defineProperty(this, 'connectStatus', {
            set: function (val) {
                this.status = val;
                this.watchStatus && this.watchStatus(val);
            }
        });
    }

    /* 初始化 */
    BleConnect.prototype.init = function () {
        if (window.hilink) {
            this.getSystem();
        }
    }
    
    /* 获取手机系统 */
    BleConnect.prototype.getSystem = function () {
        var _this = this;
        window.getSystemInfoSyncCallBack = function (res) {
            var data = JSON.parse(res);
            _this.isIOS = data.platform === 'iOS';
            console.log('手机系统---ios', _this.isIOS, data);
            _this.listeningBleChange();
            _this.getBleState();
        };
        window.hilink.getSystemInfoSync('getSystemInfoSyncCallBack');
    }

    /* 监听手机蓝牙状态 */
    BleConnect.prototype.listeningBleChange = function () {
        var _this = this;
        window.onBlueToothAdapterStateChangeCallback = function (res) {
            var data = JSON.parse(res);
            console.log('监听蓝牙状态变化', data);
            if (data.available) {
                _this.isBleAdapterClosed = false;
                _this.getRegisteredDevice();
            } else {
                _this.isBleAdapterClosed = true;
                _this.connectStatus = 0;
                _this.clearTimer();
            }
        };
        window.hilink.onBluetoothAdapterStateChange('onBlueToothAdapterStateChangeCallback');
    }

    /* 获取手机蓝牙状态 */
    BleConnect.prototype.getBleState = function () {
        var _this = this;
        window.getBlueToothAdapterStateCallback = function (res) {
            var data = JSON.parse(res);
            console.log('手机蓝牙当前状态', data);
            if (data.available) {
                _this.getRegisteredDevice();
            } else {
                _this.openBlueTooth();
            }
        }
        window.hilink.getBluetoothAdapterState('getBlueToothAdapterStateCallback');
    }

    /* 宫格页面中选择的已注册的设备 */
    BleConnect.prototype.getRegisteredDevice = function () {
        var _this = this;
        window.getCurrentRegisteredDeviceCb = function (res) {
            var data = JSON.parse(res);
            console.log('宫格页面中选择的已注册的设备', data);
            if (_this.isIOS) {
                _this.iosDeviceId = data.deviceId;
                _this.getIosDevices();
            } else {
                _this.deviceId = data.deviceId;
                _this.connectBle();
            }
        }
        window.hilink.getCurrentRegisteredDevice('getCurrentRegisteredDeviceCb');
        _this.createTimer();
    }

    BleConnect.prototype.getIosDevices = function () {
        var _this = this;
        window.onBluetoothDeviceFoundCb = function (res) {
            var data = JSON.parse(res);
            var mac = '';
            if (data.advertisData) {
                var advertisData = data.advertisData;
                advertisData = advertisData.replace(/\s+/g, '');
                advertisData = advertisData.slice(-13, -1).toLocaleUpperCase();
                mac = _this.analysisMac(advertisData);
            }
            // console.log('扫描到的设备', data, _this.iosDeviceId);
            if (_this.iosDeviceId === data.deviceId || mac === _this.iosDeviceId) {
                console.log('匹配到的设备', data, mac, _this.iosDeviceId);
                window.hilink.stopBluetoothDevicesDiscovery();
                _this.deviceId = data.deviceId;
                _this.connectBle();
            }
        }
        window.hilink.onBluetoothDeviceFound('onBluetoothDeviceFoundCb');
        window.hilink.startBluetoothDevicesDiscovery([], false, 1);
    }

    /* 连接设备 */
    BleConnect.prototype.connectBle = function () {
        var _this = this;
        _this.connectStatus = 1;
        window.onBLEConnectionStateChangeCb = function (res) {
            var data = JSON.parse(res);
            if (data.connected) {
                _this.onBLEServicesDiscovered();
            } else {
                console.log('断开连接');
                if (_this.status !== 3 && !_this.isBleAdapterClosed) {
                    _this.reConnectBle();
                }
            }
        }
        window.hilink.onBLEConnectionStateChange('onBLEConnectionStateChangeCb');
        window.hilink.createBLEConnection(_this.deviceId);
    }

    /* 重新连接 */
    BleConnect.prototype.reConnectBle = function () {
        this.createTimer();
        if (this.deviceId) {
            this.connectBle();
            return;
        }
        this.getSystem();
    }

    BleConnect.prototype.onBLEServicesDiscovered = function () {
        var _this = this;
        window.onBLEServicesDiscoveredCb = function (res) {
            var data = JSON.parse(res);
            if (data.errCode == 0 || res == 0) {
                var status = window.hilink.notifyBLECharacteristicValueChange(_this.deviceId, _this.serviceId, _this.characteristicId, true);
                console.log('连接成功------------notify', status, _this.deviceId, _this.serviceId, _this.characteristicId);
                if (status === 0) {
                    _this.connectStatus = 2;
                    _this.clearTimer();
                }
            }
        }
        window.hilink.onBLEServicesDiscovered('onBLEServicesDiscoveredCb');
    }
    
    BleConnect.prototype.createTimer = function () {
        var _this = this;
        if (_this.timer) clearTimeout(_this.timer);
        console.log('设置定时器');
        _this.timer = setTimeout(function () {
            if (_this.isIOS) {
                window.hilink.stopBluetoothDevicesDiscovery();
            }
            _this.connectStatus = 3;
            _this.clearTimer();
            _this.timer = null;
        }, 30 * 1000);
    }

    BleConnect.prototype.clearTimer = function () {
        console.log('清除定时器');
        clearTimeout(this.timer);
    }

    BleConnect.prototype.analysisMac = function (str) {
        if (str) {
            var result = [];
            for (let i = 0; i < str.length; i += 2) {
                result.push(str[i] + str[i + 1]);
            }
            return result.join(':');
        }
        return '';
    }

    /* 打开蓝牙 */
    BleConnect.prototype.openBlueTooth = function () {
        window.hilink.openBluetoothAdapter();
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = BleConnect;
    } else if (typeof define === 'function' && define.amd) {
        define(BleConnect);
    } else { 
        global.BleConnect = BleConnect;
    }
})(window)