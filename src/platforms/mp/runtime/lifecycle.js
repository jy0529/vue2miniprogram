function createMP(mpType, rootVM) {
  rootVM.$mp = {
    mpType,
  };

  if (mpType === 'app') {
    // eslint-disable-next-line no-undef
    App({
      onLaunch () {
        if (!rootVM.$mp.page) {
          rootVM.$mp.page = this;
        }
        // Do something initial when launch.
      },
      onShow () {
        // Do something when show.
      },
      onHide () {
        // Do something when hide.
      },
      onError (msg) {
        console.log(msg)
      },
      globalData: 'I am global data'
    })
  }

  if (mpType === 'page') {
    // eslint-disable-next-line no-undef
    Page({
      data: {
        $root: {},
      },
      handleProxy(e) {
        rootVM.handleProxy(e);
      },
      onLoad: function() {
        if (!rootVM.$mp.page) {
          rootVM.$mp.page = this;
        }
        console.log('page onLoad');
      },
      onShow: function() {
        console.log('page onShow');
        rootVM.initDataToMP(this);
      }
    })
  }
}

export function initMP(mpType, next) {
  console.log('init: ' + mpType);
  createMP(mpType, this);
  next();
}
