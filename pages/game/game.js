import { doublegrid } from "../../js/container/doublegrid";
import { coordinateSpace } from "../../js/lifegame/coordinate";
import { b3s23 } from "../../js/lifegame/coordinate";
import { patternlibs } from "../../js/lifegame/patternlibs";

var game = {

  loadedStates: {
    patternLoaded: false
  },

  grid: null,

  playerGrid: null,

  otherRenderTasks: [],

  delay: 0,

  cwf: null,

  shown: false,

  mouseX: 0,

  mouseY: 0,

  onLoad: function (options) {
    this.delay = 50;
    var canvas = document.getElementById('cwf');
    this.cwf = canvas.getContext('2d');
    var that = this;
    patternlibs.load(function () {
      that.loadedStates.patternLoaded = true;
    });
    this.grid = new coordinateSpace(doublegrid, 64, window.innerWidth, window.innerHeight, function (that, x, y) { return false; }, b3s23, this.render);
    this.xZoom = this.grid.xZoom;
    this.yZoom = this.grid.yZoom;
    this.y0OffSet = this.grid.y0OffSet;
    this.y1OffSet = this.grid.y1OffSet;
  },

  updateYOffSet: function () {
    var bottomOffSet = this.grid.bottomOffSet + 1;
    if (bottomOffSet >= this.grid.grid.yWidth) {
      this.grid.bottomOffSet = 0;
    }
    this.grid.bottomOffSet = bottomOffSet;
    this.grid.updateYOffSet();
    this.y0OffSet = this.grid.y0OffSet;
    this.y1OffSet = this.grid.y1OffSet;
  },

  onTick: function (lastTime) {
    this.cwf.setFillStyle('white');
    this.grid.tick(1);
    this.cwf.draw();
    var date = new Date();
    var delayTime = lastTime - date.getTime() + this.delay;
    if (delayTime <= 0 || delayTime > this.delay) {
      delayTime = this.delay;
      lastTime = date.getTime();
    }
    if (this.shown) {
      this.ticker = setTimeout(this.onTick, delayTime, lastTime + this.delay);
    }
  },

  xZoom: 0,
  yZoom: 0,
  y0OffSet: 0,
  y1OffSet: 0,

  render: function (x, y, state) {
    var x0 = Math.round(x * this.xZoom);
    var x1 = Math.round((x + 1) * this.xZoom);
    var y0 = Math.round(this.y0OffSet - y * this.yZoom);
    var y1 = Math.round(this.y1OffSet - y * this.yZoom);
    this.cwf.fillRect(x0, y1, x1 - x0, y0 - y1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.shown = true;
    patternlibs.lightWeight(this.grid, 0, 160);
    patternlibs.rlightWeight(this.grid, 30, 120);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.shown = true;
    for (state of this.loadedStates) {
      if (!state) {
        setTimeout(this.onShown, 500);
        return;
      }
    }
    delete this.loadedStates;
    var date = new Date();
    this.ticker = setTimeout(this.onTick, this.delay, date.getTime());
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.shown = false;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.shown = false;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}