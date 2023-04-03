function clearAllStrips (list: neopixel.Strip[]) {
    for (let index = 0; index <= list.length - 1; index++) {
        list[index].clear()
    }
}
input.onButtonPressed(Button.A, function () {
    yPosRed += 1
    moveRedBlue()
    music.playTone(988, music.beat(BeatFraction.Sixteenth))
})
function blinkRainbows (list: neopixel.Strip[], num: number) {
    for (let index = 0; index <= num; index++) {
        for (let index = 0; index <= list.length - 1; index++) {
            list[index].showRainbow(1, 360)
        }
        basic.pause(100)
        clearAllStrips(list)
        showAllStrips2(list)
        basic.pause(100)
    }
}
input.onPinPressed(TouchPin.P2, function () {
    xPosBlue += 1
    moveRedBlue()
    music.playTone(698, music.beat(BeatFraction.Sixteenth))
})
function showAllStrips2 (list: neopixel.Strip[]) {
    for (let index = 0; index <= list.length - 1; index++) {
        list[index].show()
    }
}
input.onButtonPressed(Button.AB, function () {
    enemySprite = game.createSprite(2, 2)
    basic.pause(1000)
    enemySprite.delete()
})
input.onButtonPressed(Button.B, function () {
    xPosRed += 1
    moveRedBlue()
    music.playTone(988, music.beat(BeatFraction.Sixteenth))
})
input.onPinPressed(TouchPin.P1, function () {
    yPosBlue += 1
    moveRedBlue()
    music.playTone(698, music.beat(BeatFraction.Sixteenth))
})
function moveRedBlue () {
    clearAllStrips(list)
    list[xPosRed % numStrip].setPixelColor(yPosRed % length, neopixel.colors(NeoPixelColors.Red))
    list[xPosBlue % numStrip].setPixelColor(yPosBlue % length, neopixel.colors(NeoPixelColors.Blue))
    list[xPosEnemy1 % numStrip].setPixelColor(yPosEnemy1 % length, neopixel.colors(NeoPixelColors.Purple))
    showAllStrips2(list)
    serial.writeLine("Blue(x,y)" + xPosBlue + "," + yPosBlue + " - - Red(x,y)" + xPosRed + "," + yPosRed)
}
/**
 * 2 players try to touch the target(enemy).  Each time they do, they hear a sound and get a point.  The enemy moves faster each time they score.  Scores will be displayed as dots on the left and right side of micro:bit or ...
 * 
 * The red score is only created & increments if either blue or red touches the enemy.
 * 
 * I don't know if this will fit on the micro:bit.
 * 
 * I think the pins of the LED's will have to be changed.
 * 
 * I have made it so that the number of LED strips can be changed by adding them to LIST as shown below.   The game recalculates accordingly.  It also recalculates if you change the lengths of each strip from 24 to 10.
 * 
 * After winning I think the enemy needs to be reset to a random position. (maybe)
 */
let enemySprite: game.LedSprite = null
let yPosEnemy1 = 0
let xPosEnemy1 = 0
let numStrip = 0
let list: neopixel.Strip[] = []
let length = 0
let yPosBlue = 0
let xPosBlue = 0
let yPosRed = 0
let xPosRed = 0
let redScore = 0
let timeEnemy = 5000
xPosRed = 0
yPosRed = 0
xPosBlue = 0
yPosBlue = 0
length = 10
list = []
list.push(neopixel.create(DigitalPin.P0, length, NeoPixelMode.RGB))
list.push(neopixel.create(DigitalPin.P1, length, NeoPixelMode.RGB))
list.push(neopixel.create(DigitalPin.P2, length, NeoPixelMode.RGB))
list.push(neopixel.create(DigitalPin.P3, length, NeoPixelMode.RGB))
numStrip = list.length
xPosEnemy1 = randint(1000, 2000)
yPosEnemy1 = randint(1000, 2000)
for (let index = 0; index <= numStrip - 1; index++) {
    list[index].showRainbow(1, 360)
}
basic.pause(1000)
blinkRainbows(list, 10)
list[xPosRed % numStrip].setPixelColor(yPosRed % length, neopixel.colors(NeoPixelColors.Red))
showAllStrips2(list)
basic.forever(function () {
    xPosEnemy1 += randint(-1, 1)
    yPosEnemy1 += randint(-1, 1)
    clearAllStrips(list)
    list[xPosRed % numStrip].setPixelColor(yPosRed % length, neopixel.colors(NeoPixelColors.Red))
    list[xPosBlue % numStrip].setPixelColor(yPosBlue % length, neopixel.colors(NeoPixelColors.Blue))
    list[xPosEnemy1 % numStrip].setPixelColor(yPosEnemy1 % length, neopixel.colors(NeoPixelColors.Purple))
    showAllStrips2(list)
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.pause(timeEnemy)
})
basic.forever(function () {
    // Check to see if value of blue or the red player is equal to the enemy's position and if so they lose a point or life.
    // 
    // Better to do the following:
    // (xPosEnemy1 - xPosRed)%numStrip == 0
    // If you have more enemies you might add things to a list and check if SOMETHING is IN LIST.
    // 
    if (xPosEnemy1 % numStrip == xPosRed % numStrip || xPosEnemy1 % numStrip == xPosBlue % numStrip) {
        if (yPosEnemy1 % length == yPosRed % length || yPosEnemy1 % length == yPosBlue % length) {
            music.playMelody("C5 G B A F A C5 B ", 120)
            redScore += 1
            timeEnemy += -50
        }
    }
})
