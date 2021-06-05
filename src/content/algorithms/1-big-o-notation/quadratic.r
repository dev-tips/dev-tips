x <- 1:20
y <- x ^ 2

svg("quadratic.svg")

plot(x, y, type = "b", xlab = "Input Size", ylab = "Runtime / Complexity", pch = 20)
