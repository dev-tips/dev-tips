x <- 1:20
y <- log2(x)

svg("logarithmic.svg")

plot(x, y, type = "b", xlab = "Input Size", ylab = "Runtime / Complexity", pch = 20)
