def clearAllStrips(list2: List[neopixel.Strip]):
    index = 0
    while index <= len(list2) - 1:
        list2[index].clear()
        index += 1

def on_button_pressed_a():
    global yPosRed
    yPosRed += 1
    moveRedBlue()
    music.play_tone(988, music.beat(BeatFraction.SIXTEENTH))
input.on_button_pressed(Button.A, on_button_pressed_a)

def blinkRainbows(list3: List[neopixel.Strip], num: number):
    index2 = 0
    while index2 <= num:
        index3 = 0
        while index3 <= len(list3) - 1:
            list3[index3].show_rainbow(1, 360)
            index3 += 1
        basic.pause(100)
        clearAllStrips(list3)
        showAllStrips2(list3)
        basic.pause(100)
        index2 += 1

def on_pin_pressed_p2():
    global xPosBlue
    xPosBlue += 1
    moveRedBlue()
    music.play_tone(698, music.beat(BeatFraction.SIXTEENTH))
input.on_pin_pressed(TouchPin.P2, on_pin_pressed_p2)

def showAllStrips2(list4: List[neopixel.Strip]):
    index4 = 0
    while index4 <= len(list4) - 1:
        list4[index4].show()
        index4 += 1

def on_button_pressed_ab():
    global enemySprite
    enemySprite = game.create_sprite(2, 2)
    basic.pause(1000)
    enemySprite.delete()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global xPosRed
    xPosRed += 1
    moveRedBlue()
    music.play_tone(988, music.beat(BeatFraction.SIXTEENTH))
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_pin_pressed_p1():
    global yPosBlue
    yPosBlue += 1
    moveRedBlue()
    music.play_tone(698, music.beat(BeatFraction.SIXTEENTH))
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

def moveRedBlue():
    clearAllStrips(list5)
    list5[xPosRed % numStrip].set_pixel_color(yPosRed % length, neopixel.colors(NeoPixelColors.RED))
    list5[xPosBlue % numStrip].set_pixel_color(yPosBlue % length, neopixel.colors(NeoPixelColors.BLUE))
    list5[xPosEnemy1 % numStrip].set_pixel_color(yPosEnemy1 % length, neopixel.colors(NeoPixelColors.PURPLE))
    showAllStrips2(list5)
    serial.write_line("Blue(x,y)" + str(xPosBlue) + "," + str(yPosBlue) + " - - Red(x,y)" + str(xPosRed) + "," + str(yPosRed))
enemySprite: game.LedSprite = None
yPosEnemy1 = 0
xPosEnemy1 = 0
numStrip = 0
list5: List[neopixel.Strip] = []
length = 0
yPosBlue = 0
xPosBlue = 0
yPosRed = 0
xPosRed = 0
redScore = 0
timeEnemy = 5000
xPosRed = 0
yPosRed = 0
xPosBlue = 0
yPosBlue = 0
length = 24
list5 = []
list5.append(neopixel.create(DigitalPin.P0, length, NeoPixelMode.RGB))
list5.append(neopixel.create(DigitalPin.P1, length, NeoPixelMode.RGB))
list5.append(neopixel.create(DigitalPin.P2, length, NeoPixelMode.RGB))
list5.append(neopixel.create(DigitalPin.P3, length, NeoPixelMode.RGB))
numStrip = len(list5)
xPosEnemy1 = randint(1000, 2000)
yPosEnemy1 = randint(1000, 2000)
index5 = 0
while index5 <= numStrip - 1:
    list5[index5].show_rainbow(1, 360)
    index5 += 1
basic.pause(1000)
blinkRainbows(list5, 10)
list5[xPosRed % numStrip].set_pixel_color(yPosRed % length, neopixel.colors(NeoPixelColors.RED))
showAllStrips2(list5)

def on_forever():
    global xPosEnemy1, yPosEnemy1
    xPosEnemy1 += randint(-1, 1)
    yPosEnemy1 += randint(-1, 1)
    clearAllStrips(list5)
    list5[xPosRed % numStrip].set_pixel_color(yPosRed % length, neopixel.colors(NeoPixelColors.RED))
    list5[xPosBlue % numStrip].set_pixel_color(yPosBlue % length, neopixel.colors(NeoPixelColors.BLUE))
    list5[xPosEnemy1 % numStrip].set_pixel_color(yPosEnemy1 % length, neopixel.colors(NeoPixelColors.PURPLE))
    showAllStrips2(list5)
    music.play_tone(262, music.beat(BeatFraction.WHOLE))
    basic.pause(timeEnemy)
basic.forever(on_forever)

def on_forever2():
    global redScore, timeEnemy
    # Check to see if value of blue or the red player is equal to the enemy's position and if so they lose a point or life.
    # 
    # Better to do the following:
    # (xPosEnemy1 - xPosRed)%numStrip == 0
    # If you have more enemies you might add things to a list and check if SOMETHING is IN LIST.
    # 
    if xPosEnemy1 % numStrip == xPosRed % numStrip or xPosEnemy1 % numStrip == xPosBlue % numStrip:
        if yPosEnemy1 % length == yPosRed % length or yPosEnemy1 % length == yPosBlue % length:
            music.play_melody("C5 G B A F A C5 B ", 120)
            redScore += 1
            timeEnemy += -50
basic.forever(on_forever2)
