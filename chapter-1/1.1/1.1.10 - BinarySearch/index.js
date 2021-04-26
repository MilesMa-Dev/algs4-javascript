const utils = {};

const main = (options) => {
    console.log('>>>', options);
    gui.result(options);
};

gui.launch(main, {}, this);