var canvas = document.querySelector('#canvas'),
    gc = canvas.getContext("2d"),
    data = map(12,12),
    // 不同形状的方块
    mold = [
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[1,1,0],[0,1,1]],
        [[0,1,1],[1,1,0]],
        [[0,1,0],[1,1,1]],
        [[1,0,0],[1,1,1]],
        [[0,0,1],[1,1,1]]
    ];

// 地图初始化
render(data,gc);

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
 * 通过修改二维数组，渲染不同颜色，来区分方块和背景。渲染方块。
 * 可刷新页面看到每次呈现不同颜色方块
 */

update(mold);
function update(mold) {
    // 回去随机一种方块矩阵
    var num = Math.floor(Math.random()*7);
        matrix = mold[num];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            // i控制的是列，j控制的是行。
            data[i][j] = matrix[i][j];
        }
    }
    render(data);
};

/**
 * 根据 map生成的二维数组渲染游戏地图。
 * 
 * @param {number} data 二维数组
 */
function render (data) {
    /**
     * 通过循环绘制方块，先绘制第一行的方块，以此类推。
     * 绘制原理：canvas宽度为500，间距均为5。假设方块宽度为 w，则 (w+5)*rLen+5 = 500。
     * 把间距和方块看成一个整体，最右边会多出一个间距。间距也可以用变量来代替。
     * 
     * @param {number} rLen 子数组长度，即每排方块个数
     * @param {number} cLen 二维数组长度，有多少列
     * @param {number} w 方块宽度
     * @param {number} h 方块高度
     */
    rLen = data[0].length,
    cLen = data.length,
    w = (495/rLen)-5,
    h = (495/cLen)-5;

    for (let i = 0; i < cLen; i++) {
        for (let j = 0; j < rLen; j++) {

            // 值为 1，则绘制成红色；为 0，则绘制成黄色。1代表方块，0代表背景。
            gc.fillStyle = data[i][j] ? 'red' : 'yellow';

            gc.fillRect( j*(w+5)+5, i*(h+5)+5, w, h );
        }
    }
    
};
