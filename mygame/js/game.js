var canvas = document.querySelector('#canvas');
var gc = canvas.getContext("2d");
var data = map(12,12);

render(data,gc);

console.log(data);
/**
 * 创建二维数组
 * 
 * @param {number} row 行 
 * @param {number} column 列 
 */
function map (row,column) {
    var data = [];
    for (let i = 0; i < column; i++) {
        data.push([]);
        for (let j = 0; j < row; j++) {
            data[i].push(0);
        }
    }
    return data;
};

/**
 * 根据 map生成的二维数组构建游戏地图，引入gc避免全局访问
 * 
 * @param {number} data 二维数组
 * @param {object} gc canvas 2D上下文
 */
function render (data,gc) {
    /**
     * 通过循环绘制方块，先绘制第一行的方块，以此类推。
     * 绘制原理：canvas宽度为500，间距均为10。假设方块宽度为 x，则 (x+10)*rLen-10 = 500。
     * 把间距和方块看成一个整体，最右边一个方块没有间距。间距也可以用变量来代替。
     * 
     * @param {number} rLen 子数组长度
     * @param {number} cLen 二维数组长度
     * @param {number} w 方块宽度
     * @param {number} h 方块高度
     */
    rLen = data[0].length,
    cLen = data.length,
    w = (510/rLen)-10,
    h = (510/cLen)-10;

    for (let i = 0; i < cLen; i++) {
        for (let j = 0; j < rLen; j++) {
            gc.fillStyle = 'yellow';
            // 每个方块的间距为10
            gc.fillRect( j*(w+10), i*(h+10), w, h );
        }
    }
    
};