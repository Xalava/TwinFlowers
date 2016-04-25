import time
import grovepi
 

sensor = 0
vibration_motor = 8

while True:
    try:
    	#Vibrate and read data
    	grovepi.digitalWrite(vibration_motor,1)
        print 'start'
        print grovepi.analogRead(sensor)
        time.sleep(.5)

        # Stop vibrating for 5 second, then repeat
        grovepi.digitalWrite(vibration_motor,0)
        print 'stop'
        time.sleep(5)

 
    except KeyboardInterrupt:
    	grovepi.digitalWrite(vibration_motor,0)

        break
    except IOError:
        print "Error"