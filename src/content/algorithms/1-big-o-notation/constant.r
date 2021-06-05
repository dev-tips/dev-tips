x <- 1:20
y <- rep(1, 20)

svg("constant.svg")

plot(x, y, type = "b", xlab = "Input Size", ylab = "Runtime / Complexity", pch = 20, xlim=c(1, 20), ylim=c(1, 20))
