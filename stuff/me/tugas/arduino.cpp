Const int redPin = 13
Const int yellowPin = 12
Const int greenPin = 11

Void setup () { 
pinMode (redPin, OUTPUT);
pinMode(yellowPin, OUTPUT);
pinMode (greenPin, OUTPUT); }

Void setLights (bool red, bool yellow, bool green)
{ digitalWrite (redPin, red);
digitalWrite (yellowPin, yellow);
digitalWrite (greenPin, green); }

Void loop () {
setLights (HiGH, LOW, LOW);
delay(5000);
setLights (LOW, HIGH, LOW);
delay(5000);
setLights (LOW, LOW, HIGH);
delay(5000); }