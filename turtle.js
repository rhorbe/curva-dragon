/* showGrid(50); 
setSpeed(200);

width(5);
color("blue");
forward(120);

width(1);
left(65);
color("red");
forward(150);

goto(184,-208);
width(2);
right(100);
color("green");
forward(150); */

let main = () => {
  showGrid(50);
  setSpeed(200);
  width(5);

  for (let i = 0; i <= 10; i++) {
    color("red");
    forward(100);

    left(90);

    penup();
    forward(50);

    pendown();
    color("blue");
    forward(100);
  }
};

main();
