window.onload = function () {
	var page = {
		init: function () {
			this.initData();
			this.internationalizes();
			if (window.hilink) {
				this.setDarkMode();
				this.setTimerTip();
				this.getSystemInfo();
			}
		},
		initData: function () {
			this.serviceId = '0000e0ff-3c17-d293-8e48-14fe2e4da212';
			this.characteristicId = '00000003-3c17-d293-8e48-14fe2e4da212';
			// ios设备没有返回advertisData字段时需要以上两个参数

			this.isDark = false;
			this.isIOS = false;
			this.deviceId = '';
			this.mac = '';
			this.currentLanguage = 'zh';
			this.fwv = '1.0';
			this.hwv = '1.0';
		},
		getSystemInfo: function () {
			var _this = this;
			window.getSystemInfoSyncCallBack = function (res) {
				var data = JSON.parse(res);
				_this.isIOS = data.platform === 'iOS';
				_this.listeningBleChange();
				_this.getBleState();
			};
			window.hilink.getSystemInfoSync('getSystemInfoSyncCallBack');
		},
		listeningBleChange: function () { // 监听蓝牙状态
			var _this = this;
			window.onBlueToothAdapterStateChangeCallback = function (res) {
				var data = JSON.parse(res);
				console.log('监听蓝牙状态变化', data);
				if(data.available) {
					_this.getUnRegisterDevice();
				} else {
					_this.openBlueTooth();
				}
			};
			window.hilink.onBluetoothAdapterStateChange('onBlueToothAdapterStateChangeCallback');
		},
		getBleState: function () {
			var _this = this;
			window.getBlueToothAdapterStateCallback = function (res) {
				var data = JSON.parse(res);
				console.log('手机蓝牙当前状态', data);
				if (data.available) {
					_this.getUnRegisterDevice();
				} else {
					_this.openBlueTooth();
				}
			}
			window.hilink.getBluetoothAdapterState('getBlueToothAdapterStateCallback');
		},
		getUnRegisterDevice: function () { // 获取当前选中的未注册的设备 
			var _this = this;
			window.getCurrentUnregisteredDeviceCallback = function (res) {
				var data = JSON.parse(res);
				_this.deviceId = data.deviceId;
				console.log('当前选中的未注册的设备', data);
				if(_this.isIOS) {
					_this.getIOSdevices();
				} else {
					_this.mac = _this.deviceId;
					_this.connectDevice();
				}
			}
			window.hilink.getCurrentUnregisteredDevice('getCurrentUnregisteredDeviceCallback');
		},
		getIOSdevices: function () { // ios需要搜索蓝牙设备获取mac
			var _this = this;
			window.onBluetoothDeviceFoundCallBack = function (res) {
				var data = JSON.parse(res);
				console.log('搜索到的设备', data);
				var macInfo = _this.getMAC(data);
				if(macInfo[0] === 1) {
					_this.mac = macInfo[1];
					_this.connectDevice();
				} else if(macInfo[0] === 2) {
					console.log('advertisData 为空');
					_this.getMacByRead();
				}
			}
			window.hilink.onBluetoothDeviceFound('onBluetoothDeviceFoundCallBack');
			window.hilink.startBluetoothDevicesDiscovery([], false, 1);
		},
		getMAC: function (data) { // ios获取mac
			if (data.deviceId === this.deviceId) {
				window.hilink.stopBluetoothDevicesDiscovery();
				console.log('匹配到设备', this.deviceId, data);
				if (data.advertisData) {
					var advertisData = data.advertisData;
					advertisData = advertisData.replace(/\s+/g, '');
					advertisData = advertisData.slice(-13, -1).toLocaleUpperCase();

					var macAdress = this.resolveMac(advertisData);
					console.log("ios advertisData", macAdress, advertisData);
					return [1, macAdress];
				} else {
					return [2, ''];
				}
			}
			return [0, ''];
		},
		getMacByRead: function () { // 连接蓝牙后读取设备值，只在没有advertisData值时才调用
			var _this = this;
			window.readBLECharacteristicValueCallback = function (res) {
				console.log('readBLECharacteristicValueCallback:', res);
				_this.mac = res;
				_this.registerDevice(res);
			}
			window.onIOSBLEConnectionStateChangeCallback = function (res) {
				var data = JSON.parse(res);
				if(data.connected) {
					var timer = null;
					if (timer) clearInterval(timer);
					timer = setInterval(() => {
						var status = window.hilink.notifyBLECharacteristicValueChange(_this.deviceId, _this.serviceId, _this.characteristicId, true);
						console.log('notify status:', status);
						if (status === 0) {
							clearInterval(timer);
							console.log('notify status:', _this.deviceId, _this.serviceId, _this.characteristicId);
							window.hilink.readBLECharacteristicValue(_this.deviceId, _this.serviceId, _this.characteristicId, 'readBLECharacteristicValueCallback');
						}
					}, 200);
				} else {
					_this.getSystemInfo();
				}
			}
			window.hilink.onBLEConnectionStateChange('onIOSBLEConnectionStateChangeCallback');
			window.hilink.createBLEConnection(_this.deviceId);
		},
		resolveMac: function (str) { // 解析mac地址
			var arr = this.toHexArr(str);
			return arr.join(':');
		},
		toHexArr: function (str) {
			var result = [],
				len = str.length;
			for(var i = 0; i < len; i += 2) {
				result.push(str[i] + str[i + 1]);
			}
			return result;
		},
		connectDevice: function () { // 连接设备
			var _this = this;
			window.onBLEConnectionStateChangeCallback = function (res) { // 监听蓝牙设备连接返回函数
				var data = JSON.parse(res);
				console.log('连接结果', data);
				if(data.connected) {
					_this.registerDevice();
				} else {
					_this.getSystemInfo();
				}
			}
			window.hilink.onBLEConnectionStateChange('onBLEConnectionStateChangeCallback') // 监听蓝牙设备连接返回
			window.hilink.createBLEConnection(_this.deviceId);
		},
		registerDevice: function () { // 注册设备
			console.log('注册设备:', this.mac);
			window.registerBleDeviceCallback = function (res) {
				console.log('注册设备结果', res);
			}
			window.hilink.registerBleDevice(this.mac, this.fwv, this.hwv, 'registerBleDeviceCallback');
		},
		openBlueTooth: function () { // 打开蓝牙
			window.hilink.openBluetoothAdapter();
		},
		setTimerTip: function () {
			var _this = this;
			//注册30s以上，提示连接超时
			setTimeout(function () {
				window.document.getElementById("btnContainer").style.cssText = "display:flex";
				if(_this.isDark){
					window.document.getElementById("btnContainer").style.background = "#000000";
					window.document.getElementsByClassName("btn")[0].style.background = "#4D4D4D";
					window.document.getElementsByClassName("btn")[0].style.color = "#3F97E9 ";
				}
				window.document.getElementById("alertContainer").style.cssText = "display:block";
				window.document.getElementById("progressContainer").style.cssText = "display:none";
			}, 30 * 1000);
			
			var i = 1;
			var timer = setInterval(() => {
				if(i >= 91){
					clearInterval(timer);
					return;
				}
				window.document.getElementById("progressValue").innerHTML = i;
				i++;
			}, 150);
		},
		getAppLanguage: function () {
			// 获取语言
			var language,
            	defualtLanguage = 'zh';
			var reg = /^zh-/i;
			if (navigator && navigator.language) {
				language = reg.test(navigator.language) ? defualtLanguage : 'en';
			} else {
				language = defualtLanguage;
			}
			return language;
		},
		internationalizes: function () {
			this.currentLanguage = this.getAppLanguage();
			// 英文文案
			if(this.currentLanguage === 'en') {
				window.document.getElementsByClassName("progressDes")[0].innerHTML = 'Connecting…';
				window.document.getElementsByClassName("failConnect")[0].innerHTML = 'Unable to connect';
				window.document.getElementsByClassName("details")[0].innerHTML = 'While connecting, make sure:';
				window.document.getElementsByClassName("details")[1].innerHTML = '1.The phone\'s Bluetooth is enabled.';
				window.document.getElementsByClassName("details")[2].innerHTML = '2.The device is within 5 meters of the phone.';
				window.document.getElementsByClassName("details")[3].innerHTML = '3.The phone is connected to the Internet.';
				window.document.getElementsByClassName("details")[4].innerHTML = '4.The device is not paired with the current account before.';
				window.document.getElementsByClassName("btn")[0].innerHTML = 'Try again';
			} 
		},
		setDarkMode: function () {
			// 暗黑模式样式
			this.isDark = window.hilink.getDarkMode && window.hilink.getDarkMode() === 2;
			if(this.isDark){
				window.document.getElementsByClassName("connect-content")[0].style.background = "#000000";
				window.document.getElementById("app").style.background = "#000000";
				window.document.getElementsByClassName("detail")[0].style.color = "rgba(255,255,255,0.66)";
				window.document.getElementsByClassName("failConnect")[0].style.color = "rgba(255,255,255,0.66)";
				window.document.getElementsByClassName("progress")[0].style.color = "rgba(255,255,255,0.66)";
				window.document.getElementsByClassName("progressDes")[0].style.color = "rgba(255,255,255,0.66)";
			}
		}
	};
	page.init();
}
