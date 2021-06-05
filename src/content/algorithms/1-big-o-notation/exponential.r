x <- 1:20
y <- 2 ^ x

svg("exponential.svg")

plot(x, y, type = "b", xlab = "Input Size", ylab = "Runtime / Complexity", pch = 20, xlim=c(1, 20), ylim=c(1, 200000))
