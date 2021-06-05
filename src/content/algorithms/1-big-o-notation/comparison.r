x <- 1:20
constant <- rep(1, 20)
linear <- 1:20
logarithmic <- log2(x)
quadratic <- x ^ 2
exponential <- 2 ^ x

svg("comparison.svg")

plot(x, constant, col = "black", type = "b", xlab = "Input Size", ylab = "Runtime / Complexity", pch = 20, xlim=c(1, 20), ylim=c(1, 200))
lines(x, linear, col = "blue", type = "b", pch = 20)
lines(x, logarithmic, col = "green", type = "b", pch = 20)
lines(x, quadratic, col = "red", type = "b", pch = 20)
lines(x, exponential, col = "darkviolet", type = "b", pch = 20)

legend("topleft", legend=c("Constant", "Linear", "Logarithmic", "Quadratic", "Exponential"), col=c("black", "blue", "green", "red", "darkviolet"), lty = 1:2, cex=0.8)
