from pathlib import Path
from base64 import b64encode
from html import escape
D=Path(__file__).parent
logo='data:image/png;base64,'+b64encode((D/'logo.png').read_bytes()).decode()
ufo='data:image/png;base64,'+b64encode((D/'ufo-en.png').read_bytes()).decode()
NAVY='#19263D';BLUE='#4861AD';MINT='#A0E7D3';GREEN='#76EF43';CREAM='#F3EEE2';PINK='#D8787F';MUTED='#A4B2CB'
s=[]
def a(v):s.append(v)
def rect(x,y,w,h,c,r=0,stroke=None):a(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}"'+(f' stroke="{stroke}"' if stroke else '')+'/>')
def t(x,y,v,size=16,c=CREAM,weight=400,font='Arial, Helvetica, sans-serif',spacing=0):a(f'<text x="{x}" y="{y}" font-family="{font}" font-size="{size}" fill="{c}" font-weight="{weight}" letter-spacing="{spacing}">{escape(v)}</text>')
def h(x,y,v,size=72,c=CREAM):t(x,y,v,size,c,800,'Arial Rounded MT Bold, Arial, sans-serif',-2)
def path(d,c,width=1,fill='none',extra=''):a(f'<path d="{d}" fill="{fill}" stroke="{c}" stroke-width="{width}" {extra}/>')
def circ(x,y,r,c,stroke=None):a(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"'+(f' stroke="{stroke}"' if stroke else '')+'/>')
def image(x,y,w,h,href,extra=''):a(f'<image x="{x}" y="{y}" width="{w}" height="{h}" href="{href}" preserveAspectRatio="xMidYMid meet" {extra}/>')
def btn(x,y,w,label,c=MINT,tc=NAVY):rect(x,y,w,56,c,28);t(x+24,y+35,label,15,tc,700);t(x+w-37,y+35,'↗',21,tc,700)
def star(x,y,r=8,c=MINT):path(f'M{x-r} {y}H{x+r}M{x} {y-r}V{y+r}',c,2)
def svg(w,height):a(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{height}" viewBox="0 0 {w} {height}">')
svg(1440,3650)
a('<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#23344F"/><stop offset="1" stop-color="#4861AD"/></linearGradient><linearGradient id="beam" x2="0" y2="1"><stop stop-color="#A0E7D3" stop-opacity=".4"/><stop offset="1" stop-color="#A0E7D3" stop-opacity="0"/></linearGradient><clipPath id="mascot"><circle cx="1062" cy="433" r="241"/></clipPath><clipPath id="screen"><rect x="80" y="1678" width="1280" height="674" rx="14"/></clipPath></defs>')
rect(0,0,1440,3650,NAVY)
# Brand header
rect(0,0,1440,104,NAVY)
rect(56,32,34,34,MINT,9);t(63,56,'LS',16,NAVY,800)
t(103,51,'LOCKSTOCK',19,CREAM,800,spacing=1);t(104,68,'G A M E S',9,MUTED,700)
for x,label in [(570,'UFO CASH'),(770,'How to play'),(940,'The studio')]:t(x,58,label,14,'#C5D1E6')
btn(1190,25,194,'For partners')
# Hero
rect(0,104,1440,688,'url(#sky)')
for x,y,r in [(714,163,4),(1278,199,3),(803,649,3),(1315,694,3),(1360,352,2),(681,477,2),(1039,153,3)]:star(x,y,r)
path('M730 715C620 440 960 575 889 279S1250 225 1384 134','#7085BE',2,extra='stroke-dasharray="5 12"')
rect(56,144,226,30,'#304762',15);circ(73,159,4,GREEN);t(85,163,'UFO CASH / FIRST CONTACT',9,MINT,700,spacing=1)
h(51,273,'Cows.',88);h(51,369,'Space.',88);h(51,465,'Big multipliers.',72,MINT)
t(58,522,'Our story starts on a farm.',20,CREAM)
t(58,556,'A flying saucer. A few abducted cows.',18,'#C4D1E9');t(58,584,'And a flight that could end at any moment.',18,'#C4D1E9')
btn(56,628,219,'Play UFO CASH',GREEN);btn(289,628,186,'How it works','#2D4164',CREAM)
t(58,749,'LOCKSTOCK GAMES / GAMES WITH CHARACTER',10,'#C0CDE6',700,spacing=1.6)
# Mascot: the supplied artwork, unchanged on a white badge
circ(1062,433,254,'#6A80C2');circ(1062,433,241,'#FFFFFF')
a('<g clip-path="url(#mascot)"><g transform="rotate(8 1062 433)">');image(862,211,400,446,logo);a('</g></g>')
rect(1186,607,173,43,MINT,21);t(1205,635,'COWS FLY HIGHER',11,NAVY,800)
rect(796,239,94,39,PINK,19);t(815,265,'MOO!',17,NAVY,800)
# Tape
rect(0,792,1440,64,MINT)
for x,label in [(56,'UNIDENTIFIED FLYING PERSONALITY'),(635,'COWS HAVE ENTERED ORBIT'),(1098,'PLAY UFO CASH')]:t(x,830,label,13,NAVY,800,spacing=1)
star(584,824,7,NAVY);star(1048,824,7,NAVY);star(1361,824,7,NAVY)
# How to play
rect(0,856,1440,620,CREAM)
t(56,922,'01 / THE ABDUCTION PLAN',11,BLUE,700,spacing=1.5)
h(52,992,'This farm has big plans.',54,NAVY)
t(57,1032,'A familiar setting. An otherworldly twist.',18,'#576075')
steps=[(56,'01','Abduct cows.',['A UFO arrives at the farm.','An ordinary day becomes','an extraordinary flight.']), (506,'02','Climb higher.',['The saucer gains altitude.','But company is closing in,','determined to bring it down.']), (956,'03','Time your exit.',['The flight could end at any time.','Cash out before the UFO','gets shot down.'])]
for x,num,title,desc in steps:
    rect(x,1090,428,310,'#E8E5DC',22)
    circ(x+49,1140,25,BLUE);t(x+34,1146,num,17,CREAM,800)
    h(x+26,1217,title,28,NAVY)
    for i,v in enumerate(desc):t(x+26,1262+i*26,v,17,'#596174')
    t(x+26,1373,'CAUTION: COWS ON BOARD' if num=='01' else 'SIGNAL FROM ORBIT' if num=='02' else 'KEEP YOUR EYES ON THE FLIGHT',9,BLUE,700,spacing=1)
t(57,1441,'A guide to the game’s story. Full rules and conditions are available in the game.',12,'#72788A')
# live game
rect(0,1476,1440,1080,NAVY)
t(56,1539,'02 / STEP INTO THE COCKPIT',11,MINT,700,spacing=1.5)
h(52,1610,'The farm is waiting. Coming?',54)
rect(56,1648,1328,738,'#273852',20,'#52617C')
image(80,1678,1280,674,ufo,'clip-path="url(#screen)"')
for x,y in [(69,1661),(1371,1661),(69,2373),(1371,2373)]:circ(x,y,3,'#98A5B8')
t(82,2424,'UFO CASH / LOCKSTOCK GAMES',12,MINT,700,spacing=1)
t(962,2424,'↗ Open in a new tab',14,'#CDD8E9');t(1202,2424,'⛶ Fullscreen',14,'#CDD8E9')
t(82,2470,'Live game hosted at launch-dev.lockstock-games.com.',13,MUTED)
t(82,2495,'English concept preview. The live game is embedded here on the website.',12,'#8293B1')
# studio
rect(0,2556,1440,569,'#A0E7D3')
t(56,2620,'03 / MADE AT LOCKSTOCK',11,NAVY,700,spacing=1.5)
h(52,2693,'Serious about games.',60,NAVY);h(52,2768,'Playful about the story.',52,NAVY)
t(58,2831,'We are LockStock Games, a casino game developer.',20,NAVY)
t(58,2865,'Our first game world is part farm, part outer space,',18,'#395C66');t(58,2893,'and full of character. Get to know the studio behind it.',18,'#395C66')
btn(56,2981,236,'Become a partner',NAVY,CREAM)
# Radar motif
circ(1145,2826,159,'#8FDACB');circ(1145,2826,120,'none','#6BB8AE');circ(1145,2826,79,'none','#6BB8AE');circ(1145,2826,36,'none','#6BB8AE')
path('M986 2826H1304M1145 2667V2985','#6BB8AE');path('M1145 2826L1249 2715L1282 2780Z','none',0,'#6FCAB6')
circ(1210,2776,8,NAVY);circ(1082,2865,5,BLUE);t(1025,3053,'OTHERWORLDLY IDEAS. DOWN-TO-EARTH PEOPLE.',9,NAVY,700,spacing=1)
# CTA
rect(0,3125,1440,414,BLUE)
t(56,3191,'04 / GROUND CONTROL',11,'#D5DFEE',700,spacing=1.5)
h(52,3272,'Room for a UFO?',66)
t(58,3323,'Let’s talk about the game and working together.',20,'#DAE4F3')
btn(56,3380,235,'Contact the studio',MINT)
star(1250,3240,24,MINT);star(1330,3337,10,PINK);star(1164,3376,9,CREAM)
# footer
rect(0,3539,1440,111,NAVY);t(56,3603,'LOCKSTOCK GAMES',16,CREAM,800,spacing=1);t(608,3603,'© LockStock Games',12,MUTED);t(1127,3603,'Play responsibly. 18+',12,MUTED)
a('</svg>')
(D/'lockstock-landing-concept.svg').write_text('\n'.join(s))
# A compact mobile direction, preserving the same artwork and hierarchy.
s=[];svg(390,1920);a('<defs><clipPath id="mobile-mascot"><circle cx="195" cy="601" r="157"/></clipPath></defs>');rect(0,0,390,1920,NAVY)
rect(20,19,28,28,MINT,8);t(25,39,'LS',13,NAVY,800);t(58,38,'LOCKSTOCK GAMES',12,CREAM,800);t(345,39,'☰',20,MINT)
rect(0,68,390,770,BLUE)
t(22,106,'UFO CASH / GAMES WITH CHARACTER',9,MINT,700,spacing=1)
h(19,163,'Cows.',45);h(19,213,'Space.',45);h(19,263,'Big multipliers.',40,MINT)
t(22,304,'A farm, a UFO and a flight that could',14,CREAM);t(22,325,'end at any moment.',14,CREAM)
btn(20,350,218,'Play UFO CASH',GREEN)
circ(195,601,167,'#7187C7');circ(195,601,157,'white');a('<g clip-path="url(#mobile-mascot)">');image(65,457,260,289,logo);a('</g>')
rect(0,838,390,55,MINT);t(30,871,'COWS HAVE ENTERED ORBIT',13,NAVY,800)
rect(0,893,390,415,CREAM);t(22,931,'01 / THE ABDUCTION PLAN',10,BLUE,700);h(19,978,'The flight begins.',29,NAVY)
for y,num,title,desc in [(1028,'01','Abduct cows.','An unidentified visitor arrives at the farm.'),(1115,'02','Climb higher.','The higher you fly, the closer the danger.'),(1202,'03','Time your exit.','Cash out before the flight ends.')]:
    circ(39,y+5,18,BLUE);t(28,y+10,num,13,CREAM,700);t(71,y,title,18,NAVY,700);t(71,y+25,desc,11,'#596174')
t(22,1353,'02 / STEP INTO THE COCKPIT',10,MINT,700);h(19,1397,'The farm is waiting.',32)
rect(20,1421,350,270,'#273852',12);image(28,1434,334,176,ufo);t(39,1643,'↗ Open in a new tab',12,CREAM);t(260,1643,'⛶ Fullscreen',12,MINT)
t(23,1728,'The embedded game adapts',12,MUTED);t(23,1749,'to the mobile game interface.',12,MUTED)
rect(0,1787,390,133,MINT);h(20,1833,'Ground control.',25,NAVY);btn(20,1852,231,'Become a partner',NAVY,CREAM)
a('</svg>');(D/'lockstock-mobile-concept.svg').write_text('\n'.join(s))
# Square presentation board lets Quick Look render the entire long SVG.
for name,height in [('lockstock-landing-concept',3650),('lockstock-mobile-concept',1920)]:
    content=(D/(name+'.svg')).read_text()
    width=1440 if 'landing' in name else 390
    content=content.replace(f'width="{width}" height="{height}" viewBox="0 0 {width} {height}"',f'width="{height}" height="{height}" viewBox="-{(height-width)/2} 0 {height} {height}"',1)
    (Path('/tmp')/(name+'-board.svg')).write_text(content)
