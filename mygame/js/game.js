var canvas = document.querySelector('#canvas'),
    gc = canvas.getContext("2d"),
    data = map(16,16),
    onOff = false,
    x = 4,
    y = 0,
    timer = null,
    arrLine = [],
    // 所有方块集合
    mold = [
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[1,1,0],[0,1,1]],
        [[0,1,1],[1,1,0]],
        [[0,1,0],[1,1,1]],
        [[1,0,0],[1,1,1]],
        [[0,0,1],[1,1,1]]
    ],
    // 生成随机一种方块的矩阵
    matrix = randomMatrix(mold);

// 一行背景数据。当消除时，需要减去一行数据，将它添加在data最前面，所谓背景数据。以保证data总数不变。
for (let i = 0; i < data[0].length; i++) {
    arrLine[i] = 0;
}

// 地图初始化
render(data);

// 执行方块下落
fall(400);

document.onkeydown = function (e) {
    switch (e.keyCode) {
        // 左
        case 37:
            clear(matrix);
            if (!collisionX(-1)) {
                x--;
            }
            update(matrix);
        break;
    
        // 上
        case 38:
            clear(matrix);
            matrix = rotate(matrix);
            break;
        // 右
        case 39:
            clear(matrix);
            if (!collisionX(1)) {
                x++;
            }
            update(matrix);    
        break;
        // 下
        case 40:
            if (onOff) {
                return;
            }
            onOff = true;
            clearInterval(timer);
            fall(50);
        break;
    }
};

// 下键键盘抬起事件
document.onkeyup = function (e){
    if (e.keyCode == 40) {
        onOff = false;
        clearInterval(timer);
        fall(400);
    }
};

/**
 * 方块下落函数
 * 
 * @param {number} time 定时 
 */

function fall(time) {
    timer = setInterval(function () {
            update(matrix);
            if (!collisionY(matrix)) {
                clear(matrix);
            }
            // 碰撞成功，则不清除上一个方块，生成一个新的方块
            if (collisionY(matrix)) {
                fullLine(arrLine);
                y = -1;
                x = 4;
                matrix = randomMatrix(mold);
            }
            y++;
        },time);
};

/**
 * X轴的碰撞检测，返回true，则碰撞成功。返回false，则碰撞失败。
 * 
 * @param {number} n 1或者-1。表示执行x++和x--操作。
 */
function collisionX(n) {
    var maxX = data[0].length -  matrix[0].length,
    num,
    index;
    if (n + x < 0 || n + x > maxX) {
        return true;
    }

    // 简化写法
    for (let i = 0; i < matrix.length; i++) {
        if (n > 0) {
            index = matrix[0].length;
            num = 1;
        } else {
            index = 0;
            num = -1;
        }
        while (!matrix[i][index]) {
            n > 0 ? index-- : index++;
        }
        if (data[y+i][x+index+num]) {
            return true;
        } 
    };
    return false;

    // if (n > 0) {
    //     for (let i = 0; i < matrix.length; i++) {
    //         var index = matrix[0].length;
    //         while (!matrix[i][index]) {
    //             index--;
    //         }
    //         if (data[y+i][x+index+1]) {
    //             return true;
    //         } 
    //     };
    //     return false;
    // } else {
    //     for (let i = 0; i < matrix.length; i++) {
    //         var index = 0;
    //         while (!matrix[i][index]) {
    //             index++;
    //         }
    //         if (data[y+i][x+index-1]) {
    //             return true;
    //         } 
    //     };
    //     return false;
    // }
};

/**
 * Y轴的碰撞检测，返回true，则碰撞成功。返回false，则碰撞失败。
 * 
 * @param {array} matrix 方块矩阵
 */
function collisionY(matrix) {
    // 多次使用，则用变量存储
    var len = matrix.length;
    // 方块到底部
    if (y >= data.length - len) {
        return true;
    };
    var n;
    for (let i = 0; i < matrix[len-1].length; i++) {
        n = len - 1;
        while (!matrix[n][i]) {
            n--;
        }
        if (data[n+y+1][x+i]) {
            return true;
        } 
    };
    return false;
};

/**
 * 方块的翻转
 * 
 * @param {array} matrix 方块的类型数组
 */
function rotate (matrix) {
    var arr = [],
        x = matrix.length,
        y = matrix[0].length;

    for (let i = 0; i < y; i++) {
        arr.push([]);
    }

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            arr[j][x-1-i] = matrix[i][j];
        }
    }
    return arr;
};

/**
 * 创建二维数组
 * 
 * @param {number} row 行 
 * @param {number} column 列 
 */

function map (row,column) {
    var data = [];
    // let 作用相当于var，但是var在循环中是存在问题的。
    // 因为var没有块作用域，所有的迭代存在一个作用域中。在闭包的情况下，会存在问题（得到的每一个声明值，都是最后一个）。
    for (let i = 0; i < column; i++) {
        data.push([]);
        for (let j = 0; j < row; j++) {
            data[i].push(0);
        }
    }
    return data;
};
/**
 * 判断是否有满行，进行消除
 */
function fullLine(arrLine) {
    var result = false;
    for (let i = 0; i < data.length; i++) {
    // 遍历data[i]数组，如果该数组每一个值都为1，则返回true，否则返回false。
    // () => {} es6语法：箭头函数。类似function
    // 数组every方法： es5语法。
    result = data[i].every((val)=>{
                return val == 1;
            });
        if (result) {
            data.splice(i,1);
            data.unshift([].concat(arrLine));
            result = false;
        }
    }
}

/**
 *  返回一个随机的方块矩阵，尽量采用传参，以避免全局访问。
 * 
 * @param {array} mold 方块的类型数组
 */

function randomMatrix(mold) {
    return mold[Math.floor(Math.random()*7)];
};

/**
 * 创建一个方块
 * 
 * @param {array} matrix 方块的类型数组
 */

function update(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            // 等于0才将它等于1。这是因为绘制时会将其他方块为1的值改为0。
            if (!data[i+y][j+x]) {
                data[i+y][j+x] = matrix[i][j];
            }
        }
    }
    render(data);
};

/**
 * 清除上一个方块
 * 
 * @param {array} matrix 方块的类型数组
 */

function clear (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            // i控制的是列，j控制的是行。
            if (matrix[i][j]) {
                data[i+y][j+x] = 0;
            }
        }
    }
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

    var rLen = data[0].length,
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
