function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

const stage = new createjs.Stage("canvas");
const shapeProperties = [['lavender', 'mediumvioletred'], ['lavender', 'dodgerblue'], ['lavender', 'crimson'], ['lavender', 'darkslategray'], ['pink', 'mediumvioletred'], ['pink', 'dodgerblue'], ['pink', 'crimson'], ['pink', 'darkslategray'], ['ivory', 'mediumvioletred'], ['ivory', 'dodgerblue'], ['ivory', 'crimson'], ['ivory', 'darkslategray'], ['powderblue', 'mediumvioletred'], ['powderblue', 'dodgerblue'], ['powderblue', 'crimson'], ['powderblue', 'darkslategray']];

let level = 1;
let IQ = 0;
const shapeWidth = 100;
const innerWidth = 80;
const margin = 10;
const startX = 180;
const startY = 20;
const answerX = 120;

function init() {
    createjs.Ticker.addEventListener("tick",tick);
    createjs.Ticker.setFPS(60);
    stage.enableMouseOver();
    drawLevel();
}
function tick(){
    stage.update();
}
function drawLevel() {
    stage.autoClear = true;
    stage.removeAllChildren();
    let text = new createjs.Text("IQ Game", "40px Arial", "#333");
    text.x = 10;
    text.y = 5;
    stage.addChild(text);
    text = new createjs.Text(`Level ${level}`, "40px Arial", "#333");
    text.x = 10;
    text.y = 55;
    stage.addChild(text);
    text = new createjs.Text(`IQ ${IQ}`, "40px Arial", "#F33");
    text.x = 10;
    text.y = 105;
    stage.addChild(text);
    text = new createjs.Text("👇 pick an image that is not shown above 👆", "40px Arial", "#555");
    text.x = answerX-100;
    text.y = 360;
    stage.addChild(text);
    let originalShapes = [...shapeProperties];
    shuffle(originalShapes);
    let levelShapes = originalShapes.slice(0, 9);
    levelShapes.forEach(function (e, i) {
        levelShapes[i] = [...levelShapes[i], i]
    });
    shuffle(levelShapes);
    let wrongAnswers = [...levelShapes].slice(0, 3);
    let correctAnswer = [...originalShapes.pop(), Math.floor(Math.random() * 3)];
    let answers = [...wrongAnswers, correctAnswer];
    shuffle(answers);
    levelShapes.forEach(function (e, i) {
        let border = new createjs.Shape();
        let outerRectangle = new createjs.Shape();
        let shape = new createjs.Shape();
        outerRectangle.graphics.beginFill(e[0])
            .drawRoundRect(startX + i % 3 * shapeWidth + margin * (i % 3 + 1),
                startY + shapeWidth * (Math.floor(i / 3)) + margin * Math.floor(i / 3),
                shapeWidth, shapeWidth, 15);
        border.graphics.beginStroke("#000")
            .drawRoundRect(startX + i % 3 * shapeWidth + margin * (i % 3 + 1),
                startY + shapeWidth * (Math.floor(i / 3)) + margin * Math.floor(i / 3),
                shapeWidth, shapeWidth, 15);

        if (e[2] % 3 === 0) {
            shape.graphics.beginFill(e[1])
                .drawRoundRect(startX + i % 3 * shapeWidth + margin * (i % 3 + 1) * 2 - i % 3 * (shapeWidth - innerWidth) / 2,
                    startY + innerWidth * (Math.floor(i / 3)) + margin * Math.floor(i / 3) + (shapeWidth - innerWidth) * (0.5 + Math.floor(i / 3)),
                    innerWidth, innerWidth, 15);
        } else if (e[2] % 3 === 1) {
            shape.graphics.beginFill(e[1])
                .drawCircle(startX + i % 3 * shapeWidth + margin * (i % 3 + 1) * 2 - i % 3 * (shapeWidth - innerWidth) / 2 + innerWidth / 2,
                    startY + innerWidth * (Math.floor(i / 3)) + margin * Math.floor(i / 3) + (shapeWidth - innerWidth) * (0.5 + Math.floor(i / 3)) + innerWidth / 2,
                    innerWidth / 2,);
        } else if (e[2] % 3 === 2) {
            shape.graphics.beginFill(e[1])
                .drawPolyStar(startX + i % 3 * shapeWidth + margin * (i % 3 + 1) * 2 - i % 3 * (shapeWidth - innerWidth) / 2 + innerWidth / 2,
                    startY + innerWidth * (Math.floor(i / 3)) + margin * Math.floor(i / 3) + (shapeWidth - innerWidth) * (0.5 + Math.floor(i / 3)) + innerWidth / 2,
                    innerWidth / 2, 3, 0);
        }

        stage.addChild(outerRectangle);
        stage.addChild(border);
        stage.addChild(shape);
    });


    answers.forEach(function (e, i) {
        let border = new createjs.Shape();
        let outerRectangle = new createjs.Shape();
        let shape = new createjs.Shape();
        border.graphics.beginStroke("#000").drawRoundRect(answerX + i * shapeWidth + margin * (i + 1), 400, shapeWidth, shapeWidth, 15);
        outerRectangle.graphics.beginFill(e[0]).drawRoundRect(answerX + i * shapeWidth + margin * (i + 1), 400, shapeWidth, shapeWidth, 15);
        if (e[2] % 3 === 0) {
            shape.graphics.beginFill(e[1]).drawRoundRect(answerX + i * shapeWidth + 2 * margin * (i + 1) - i * (shapeWidth - innerWidth) / 2,
                400 + (shapeWidth - innerWidth) / 2,
                innerWidth, innerWidth, 15);
        } else if (e[2] % 3 === 1) {
            shape.graphics.beginFill(e[1])
                .drawCircle(answerX + margin * (i + 1) * 2 + i * 0.5 * shapeWidth + (i + 1) * .5 * innerWidth,
                    400 + (shapeWidth - innerWidth) / 2 + innerWidth / 2,
                    innerWidth / 2,);
        } else if (e[2] % 3 === 2) {
            shape.graphics.beginFill(e[1])
                .drawPolyStar(answerX + margin * (i + 1) * 2 + i * 0.5 * shapeWidth + (i + 1) * .5 * innerWidth,
                    400 + (shapeWidth - innerWidth) / 2 + innerWidth / 2,
                    innerWidth / 2, 3, 0);
        }
        outerRectangle.addEventListener("click",function(){
            if(wrongAnswers.includes(e)){
                alert("INCORRECT! Go to next level");
                level += 1;
                if(level===10){
                    drawResult();
                }else{
                    IQ +=1;
                    drawLevel();
                }
            }else{
                alert("CORRECT! Go to next level")
                level += 1;

                if(level===10){
                    drawResult();
                }else{
                    IQ +=1;
                    drawLevel();
                }
            }

        });
        outerRectangle.addEventListener("mouseover",function(){
            stage.autoClear = false;
            border.graphics.beginStroke("#fff").drawRoundRect(answerX + i * shapeWidth + margin * (i + 1), 400, shapeWidth, shapeWidth, 15);
            stage.addChild(border);
        });
        outerRectangle.addEventListener("mouseout",function(){
            stage.autoClear = false;
            border.graphics.beginStroke("#000").drawRoundRect(answerX + i * shapeWidth + margin * (i + 1), 400, shapeWidth, shapeWidth, 15);
            stage.addChild(border);
        });
        stage.addChild(outerRectangle);
        stage.addChild(border);
        stage.addChild(shape);
    });
}

function drawResult(){
    stage.autoClear = true;
    stage.removeAllChildren();
    let text = new createjs.Text(`Game Over: Your IQ is ${IQ}`, "40px Arial", "#800");
    text.x = 50;
    text.y = 100;
    stage.addChild(text);
}





