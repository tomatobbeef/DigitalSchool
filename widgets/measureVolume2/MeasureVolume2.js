/* 参考 mars3d.analysi.MeasureVolume 源码进行优化修改 */
/* 形成新工具 mars3d.analysi.MeasureVolume2 */
/* by duxin @2020-09-10 */ 
(function(_mars3d, exports) {

    if(exports.MeasureVolume2!=null){
        return;
    }
    
    exports.MeasureVolume2 = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var Cesium = _mars3d.Cesium;

    var _point = _mars3d.point;

    var _Util = _mars3d.draw.util;

    var _polygon = _mars3d.polygon;

    var _Attr = _mars3d.draw.attr.label;

    var _Attr2 = _mars3d.draw.attr.polygon;

    var _Draw = _mars3d.Draw;

    var _util = _mars3d.util;


    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    // dux
    //方量分析(体积分析)
    var MeasureVolume2 = exports.MeasureVolume2 = function () {
        //========== 构造方法 ========== 
        function MeasureVolume(viewer, options) {
            _classCallCheck(this, MeasureVolume);

            this.viewer = viewer;
            options = Cesium.defaultValue(options, {});
            this.options = options;

            this._last_depthTestAgainstTerrain = this.viewer.scene.globe.depthTestAgainstTerrain;

            this.onStart = options.onStart;
            this.onStop = options.onStop;

            this._heightLabel = Cesium.defaultValue(options.heightLabel, true);
            this._offsetLabel = Cesium.defaultValue(options.offsetLabel, false);

            //显示测量结果文本的字体
            // 可以在option里订，不改代码
            var _labelAttr = {
                "color": "#ffffff",
                "font_family": "楷体",
                "font_size": 20,
                "border": true,
                "border_color": "#000000",
                "border_width": 3,
                "background": true,
                "background_color": "#000000",
                "background_opacity": 0.3,
                "scaleByDistance": true,
                "scaleByDistance_far": 800000,
                "scaleByDistance_farValue": 0.5,
                "scaleByDistance_near": 1000,
                "scaleByDistance_nearValue": 1,
                "pixelOffset": [0, -15],
                "visibleDepth": false
            };
            if (Cesium.defined(options.label)) {
                for (var key in options.label) {
                    _labelAttr[key] = options.label[key];
                }
            }
            this._labelAttr = _labelAttr;

            var _labelHeightAttr = {
                "color": "#ffffff",
                "font_family": "楷体",
                "font_size": 15,
                "border": true,
                "border_color": "#000000",
                "border_width": 3,
                "background": false,
                "scaleByDistance": true,
                "scaleByDistance_far": 800000,
                "scaleByDistance_farValue": 0.5,
                "scaleByDistance_near": 1000,
                "scaleByDistance_nearValue": 1,
                "pixelOffset": [0, -15],
                "visibleDepth": false
            };
            if (Cesium.defined(options.labelEx)) {
                for (var key in options.labelEx) {
                    _labelHeightAttr[key] = options.labelEx[key];
                }
            }
            this._labelHeightAttr = _labelHeightAttr;

            //面的样式
            var _polygonStyle = (0, _Util.getDefStyle)("polygon", {
                color: "#00fff2",
                opacity: 0.4
            });
            if (Cesium.defined(options.polygon)) {
                for (var key in options.polygon) {
                    _polygonStyle[key] = options.polygon[key];
                }
            }
            this._polygonStyle = _polygonStyle;

            //基准面的样式
            var _polygonJzmStyle = (0, _Util.getDefStyle)("polygon", {
                "color": "#00ff00",
                "opacity": 0.3
            });
            if (Cesium.defined(options.polygonJzm)) {
                for (var key in options.polygonJzm) {
                    _polygonJzmStyle[key] = options.polygonJzm[key];
                }
            }
            this._polygonJzmStyle = _polygonJzmStyle;

            this.drawControl = new _Draw(this.viewer, {
                hasEdit: false,
                removeScreenSpaceEvent: true
            });
        }

        //========== 对外属性 ==========  


        _createClass(MeasureVolume, [{
            key: 'startDraw',


            //========== 方法 ==========  
            value: function startDraw(opts) {
                this.clear();
                // this._polygonStyle.clampToGround = true //贴地

                var that = this;
                // 绘制时关地形检测
                that.viewer.scene.globe.depthTestAgainstTerrain = false;
                this.drawControl.startDraw({
                    type: "polygon",
                    style: this._polygonStyle,
                    success: function success(entity) {
                        if (entity.polygon == null) return;

                        // dux:position
                        var positions = that.drawControl.getPositions(entity);
                        // clone 避免相互影响
                        var newpositions = [];
                        for (var i = 0; i < positions.length; i++) {
                            var point = positions[i].clone();
                            if (!point) continue;
                            newpositions.push(point);
                        }
                        that.originPositions = newpositions;
                        that.start(positions, opts);

                        that.drawControl.deleteEntity(entity);
                    }
                });
            }
        }, {
            key: 'start',
            value: function start(positions, opts) {
                opts = opts || {};
                if (this.onStart) this.onStart(positions);

                var that = this;
                setTimeout(function () {
                    //计算体积
                    var result = (0, _polygon.interPolygon)({
                        positions: positions,
                        scene: that.viewer.scene,
                        splitNum: that.options.splitNum, //插值次数
                        minHeight: opts.minHeight,
                        has3dtiles: that.options.has3dtiles,
                        asyn: true,
                        calback: function calback(resultInter) {
                            that._start(positions, resultInter);
                        }
                    });

                    if (result._has3dtiles) {
                        that.viewer.scene.globe.depthTestAgainstTerrain = false;
                    } else {
                        that.viewer.scene.globe.depthTestAgainstTerrain = true;
                    }
                }, 500);
            }
        }, {
            key: '_start',
            value: function _start(positions, resultInter) {
                this.positions = positions;

                resultInter = (0, _polygon.updateVolumeByMinHeight)(resultInter);
                this.squareResult = resultInter;

                //计算各点的贴地高度和贴地点
                var tdHeights = [];
                var tdposs = [];
                for (var i = 0; i < positions.length; i++) {
                    var height = Math.max((0, _point.getSurfaceHeight)(this.viewer.scene, positions[i]), this.squareResult.minHeight);
                    tdHeights.push(height);

                    var cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
                    tdposs.push(Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height));
                }
                this.tdHeights = tdHeights;
                this.tdposs = tdposs;

                // this.resetLabels();
                var maxHeight = this.squareResult.maxHeight;
                //求中心点 
                this.ptcenter = (0, _point.centerOfMass)(positions, maxHeight + 10);

                this._maxHeight = maxHeight;
                this._minHeight = this.squareResult.minHeight;
                this.jzmHeight = this.squareResult.minHeight;
                this.resetLabels();

                // 显示基准面
                var dataSource = this.drawControl.dataSource;
                var that = this;
                if (!this.entityPQM) {
                    var entityattr = (0, _Attr2.style2Entity)(this._polygonJzmStyle, {
                        hierarchy: new Cesium.PolygonHierarchy(positions),
                        height: new Cesium.CallbackProperty(function (time, result) {
                            return that.jzmHeight;
                        }, false)
                    });
                    delete entityattr.perPositionHeight;

                    this.entityPQM = dataSource.entities.add({
                        polygon: entityattr
                    });
                }

                // 显示贴地范围
                if (!this.entityArea) {
                    var entityattr = {
                        positions: positions.concat(positions[0]),
                        clampToGround: true,
                        material : Cesium.Color.RED.withAlpha(0.7),
                        width : 3.0,
                    };
                    this.entityArea = dataSource.entities.add({
                        polyline: entityattr
                    });
                }

                // 显示立体边界
                delete this._polygonStyle.clampToGround;
                var entityattr = (0, _Attr2.style2Entity)(this._polygonStyle, {
                    hierarchy: new Cesium.PolygonHierarchy(positions),
                    height: new Cesium.CallbackProperty(function (time, result) {
                        return that.minHeight;
                    }, false),
                    extrudedHeight: new Cesium.CallbackProperty(function (time, result) {
                        return that.jzmHeight;
                    }, false),
                    closeTop: false,
                    closeBottom: true
                });
                this.entityWell = dataSource.entities.add({
                    polygon: entityattr
                });

                // 上部分墙体
                this.entityWellUpper = dataSource.entities.add({
                    polygon:   (0, _Attr2.style2Entity)(Object.assign({},this._polygonStyle,{
                        "fillType": "color",
                        "outline": true,
                        "outlineWidth": 1,
                        "outlineColor": "#ffffff",
                        "outlineOpacity": 0.9,
                        "zIndex": 0,
                        closeTop: false,
                        closeBottom: false,
                        color: "#ffffff",
                        opacity: 0.1
                    }), {
                        hierarchy: new Cesium.PolygonHierarchy(positions),
                        height: new Cesium.CallbackProperty(function (time, result) {
                            return that.jzmHeight;
                        }, false),
                        extrudedHeight: new Cesium.CallbackProperty(function (time, result) {
                            return that.maxHeight;
                        }, false)                    
                    })
                });

                this.measureFill(this.squareResult.minHeight, true);
            }
        }, {
            key: 'resetLabels',
            value: function resetLabels() {
                if (this.tdLabels && this.tdLabels.length) {
                    for (var e = 0; e < this.tdLabels.length; e++) {
                        this.drawControl.deleteEntity(this.tdLabels[e]);
                    }
                }

                if (!this.heightLabel && !this.offsetLabel) return;

                var arr = [];
                for (var e = 0, len = this.tdHeights.length; e < len; e++) {
                    var height = this.tdHeights[e];

                    var text = "";
                    if (this.heightLabel) {
                        text += "海拔：" + height.toFixed(2) + "米";
                    }
                    if (this.offsetLabel) {
                        var offset = (this.height || 0) - height;
                        if (this.heightLabel) text += "\n";
                        text += "离地：" + offset.toFixed(2) + "米";
                    }

                    //各点的文本
                    var entityattr = (0, _Attr.style2Entity)(this._labelHeightAttr, {
                        text: text,
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    });

                    var l = this.drawControl.dataSource.entities.add({
                        position: this.tdposs[e],
                        label: entityattr
                    });
                    arr.push(l);
                }
                this.tdLabels = arr;
            }
        }, {
            key: 'formatNum',
            value: function formatNum(num) {
                //格式化数值
                if (num > 10000) {
                    return (num / 10000).toFixed(2) + "万";
                }
                return num.toFixed(2);
            }
        }, {
            key: 'measureFill',
            value: function measureFill(height, hasCalback) {
                var fillV = (0, _polygon.updateVolume)(this.squareResult, height);
                if (!fillV) return;

                if (!this.ptcenter) return;
                var dataSource = this.drawControl.dataSource;

                if (this.entitieLbl) {
                    dataSource.entities.remove(this.entitieLbl);
                }
     
                if (this.entitieFillLbl) {
                    dataSource.entities.remove(this.entitieFillLbl);
                }
                if (this.entitieDigLbl) {
                    dataSource.entities.remove(this.entitieDigLbl);
                }
                var fillText = '';
                if (fillV.fillVolume > 0) {
                    fillText += '填方体积：' + this.formatNum(fillV.fillVolume) + "立方米\n";

                    var entityattr0 = (0, _Attr.style2Entity)(Object.assign({},this._labelAttr,{
                        "color": "#ffff00",
                        "font_family": "楷体",
                        "font_size": 20,
                        "border": true,
                        "border_color": "#000000",
                        "border_width": 3,
                        "background": true,
                        "background_color": "#000000",
                        "background_opacity": 0.3,
                    }), {
                        text: '填方体积：' + this.formatNum(fillV.fillVolume) + "立方米",
                        horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    });

                    //求中心点 
                    var ptcenter0 = (0, _point.centerOfMass)(this.positions, (this._minHeight + this.jzmHeight)/2 + 10);
                    this.entitieFillLbl = dataSource.entities.add({
                        position: ptcenter0,
                        label: entityattr0
                    });
                }

                if (fillV.digVolume > 0) {
                    fillText += "挖方体积：" + this.formatNum(fillV.digVolume) + "立方米\n";

                    var entityattr1 = (0, _Attr.style2Entity)(Object.assign({},this._labelAttr,{
                        "color": "#ffffff",
                        "font_family": "楷体",
                        "font_size": 20,
                        "border": true,
                        "border_color": "#000000",
                        "border_width": 3,
                        "background": true,
                        "background_color": "#ffffff",
                        "background_opacity": 0.3,
                    }), {
                        text: "挖方体积：" + this.formatNum(fillV.digVolume) + "立方米",
                        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    });
                    var ptcenter1 = (0, _point.centerOfMass)(this.positions, (this.jzmHeight + this._maxHeight)/2 + 10);
                    this.entitieDigLbl = dataSource.entities.add({
                        position: ptcenter1,
                        label: entityattr1
                    });

                }

                // fillText += '横切面积：' + (0, _util.formatArea)(fillV.totalArea);

                // //添加文字
                // var entityattr = (0, _Attr.style2Entity)(this._labelAttr, {
                //     text: fillText,
                //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                // });
                // this.entitieLbl = dataSource.entities.add({
                //     position: this.ptcenter,
                //     label: entityattr
                // });
                if (hasCalback && this.onStop) this.onStop(fillV);
            }
        }, {
            key: 'clear',
            value: function clear() {
                this.drawControl.clearDraw();
                this.entitieLbl && this.drawControl.dataSource.entities.remove(this.entitieLbl);
                this.entityPQM && this.drawControl.dataSource.entities.remove(this.entityPQM);
                this.entityWell && this.drawControl.dataSource.entities.remove(this.entityWell);

                this.entityWellUpper && this.drawControl.dataSource.entities.remove(this.entityWellUpper);
                this.entityArea && this.drawControl.dataSource.entities.remove(this.entityArea);
                this.entitieFillLbl && this.drawControl.dataSource.entities.remove(this.entitieFillLbl);
                this.entitieDigLbl && this.drawControl.dataSource.entities.remove(this.entitieDigLbl);

                delete this.entitieLbl;
                delete this.entityPQM;
                delete this.entityWell;
                delete this.entityWellUpper;

                delete this.entityArea;
                delete this.entitieFillLbl;
                delete this.entitieDigLbl;

                delete this.originPositions;
                delete this.tdHeights;
                delete this.tdposs;
            }
        }, {
            key: 'resetFillV',
            value: function resetFillV() {
                //重置挖方
                var newFillV = (0, _polygon.updateVolume)(this.squareResult, this.jzmHeight);
                var dataSource = this.drawControl.dataSource;
                if (this.entitieLbl) {
                    dataSource.entities.remove(this.entitieLbl);
                }
                if (this.entitieFillLbl) {
                    dataSource.entities.remove(this.entitieFillLbl);
                }
                if (this.entitieDigLbl) {
                    dataSource.entities.remove(this.entitieDigLbl);
                }

                var fillText = '投影面积：' + (0, _util.formatArea)(newFillV.totalArea);
                if (newFillV.fillVolume > 0) {
                    fillText += '\n填方体积：' + this.formatNum(newFillV.fillVolume) + "立方米";
                }
                if (newFillV.digVolume > 0) {
                    fillText += "\n挖方体积：" + this.formatNum(newFillV.digVolume) + "立方米";
                }

                //添加文字
                var entityattr = (0, _Attr.style2Entity)(this._labelAttr, {
                    text: fillText,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                });
                this.entitieLbl = dataSource.entities.add({
                    position: this.ptcenter,
                    label: entityattr
                });
            }
        }, {
            key: 'selecteHeight',
            value: function selecteHeight(calback) {
                //拾取高度
                if (!this.entityPQM || !this.entityWell) return;

                var that = this;
                this.drawControl.startDraw({
                    type: "point",
                    style: {
                        color: "#00fff2"
                    },
                    success: function success(entity) {
                        if (!entity.point) return;

                        var pos = entity._position._value;
                        var height = Cesium.Cartographic.fromCartesian(pos).height;
                        that.height = height;

                        that.drawControl.dataSource.entities.remove(entity);

                        if (calback) calback(height);
                    }
                });
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.viewer.scene.globe.depthTestAgainstTerrain = this._last_depthTestAgainstTerrain;
                delete this._last_depthTestAgainstTerrain;

                this.clear();
                this.drawControl.destroy();
                delete this.viewer;
                delete this.jzmHeight;
                delete this.drawControl;
                delete this.squareResult;
                delete this.ptcenter;
                delete this.positions;
                delete this.onStop;
                delete this.originPositions;
            }
        }, {
            key: 'resultInter',
            get: function get() {
                return this.squareResult;
            }
            //高度

        }, {
            key: 'height',
            get: function get() {
                return this.jzmHeight;
            },
            set: function set(val) {
                this.jzmHeight = val;
                if (val > this.maxHeight) this.maxHeight = val;
                if (val < this.minHeight) this.minHeight = val;

                if (!this.entityPQM || !this.entityWell) return;
                this.resetFillV();
                this.measureFill(val);
                this.resetLabels();
            }
        }, {
            key: 'minHeight',
            get: function get() {
                return this._minHeight;
            },
            set: function set(val) {
                this._minHeight = val;
                if (this.squareResult) {
                    this.squareResult.minHeight = val;
                    this.squareResult = (0, _polygon.updateVolumeByMinHeight)(this.squareResult);
                }
                this.resetFillV();
                this.measureFill(this.height);
                this.resetLabels();
            }
        }, {
            key: 'maxHeight',
            get: function get() {
                return this._maxHeight;
            },
            set: function set(val) {
                this._maxHeight = val;
                if (this.squareResult) this.squareResult.maxHeight = val;
            }
        }, {
            key: 'heightLabel',
            get: function get() {
                return this._heightLabel;
            },
            set: function set(val) {
                this._heightLabel = val;
                this.resetLabels();
            }
        }, {
            key: 'offsetLabel',
            get: function get() {
                return this._offsetLabel;
            },
            set: function set(val) {
                this._offsetLabel = val;
                this.resetLabels();
            }
        }]);

        return MeasureVolume;
    }();

})(mars3d, mars3d.analysi == null ? mars3d.analysi = {} : mars3d.analysi)