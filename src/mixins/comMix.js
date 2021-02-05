const comMix = {
    methods: {
        callHilink (op = {}) {
            /**
             * name  hilink函数名称
             * options  方法参数，写成数组形式
             * cbName 自定义window回调函数，不传默认在hilink函数后添加Cb
             * cb  回调函数，传入则会在window下挂载一个回调函数
             * needReturn  需要return值才传，例如蓝牙接口notify接口
             * 调用示例
             * this.callHilinkFn({
                    name: 'getDevInfoAll',
                    options: ['0', ''],
                    cb: res => {
                        console.log(res);
                    }
                });
             * 
             */
            let fn = window.hilink && window.hilink[op.name];
            let _options = op.options || [];
            if (op.cb) {
                let cbName = op.cbName || `${op.name}Cb`;
                window[cbName] = res => {
                    op.cb(this.praseResponseData(res));
                };
                _options.push(cbName);
            }
            if (op.needReturn) {
                return fn && fn.apply(window.hilink, _options);
            }
            fn && fn.apply(window.hilink, _options);
        },
        callHilinkFn (eventName, options = [], needReturn = false) {
            let fn = window.hilink && window.hilink[eventName];
            if (needReturn) {
                return fn && fn.apply(window.hilink, options);
            }
            fn && fn.apply(window.hilink, options);
        },
        praseResponseData (resData) {
            // 解析返回的数据
            try {
                return JSON.parse(resData);
            } catch (error) {
                var dataStr = resData.replace(/:"{/g, ':{');
                dataStr = dataStr.replace(/}",/g, '},');
                dataStr = dataStr.replace(/\\/g, '');
                return JSON.parse(dataStr);
            }
        },
        createCb (cbArr = []) {
            // 创建回调函数到window对象下，其他页面引入调用方式如下，页面中methods需存在数组中对应的函数
            // createCb(['resultCallback']);
            let _this = this;
            cbArr.forEach(cb => {
                window[cb] = function (res) {
                    _this[cb] && _this[cb](_this.praseResponseData(res));
                };
            });
        }
    }
};
export default comMix;