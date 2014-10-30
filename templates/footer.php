
        <footer>
            <div class="center">
                <p>JS-Tricks.com provides tips, tricks, and techniques on JavaScript running on node.js and the browser in the form of snippets and tutorials.</p>
                <p>It’s brought to you by <a href="https://fapprik.com/" id="fapprik">fapprik</a>, an agency from Munich which designs and develops JavaScript-powered apps for Facebook, smartphones, tablet PCs, smartwatches, smart TVs &amp; the Web.</p>
                <p id="github">It you’d like to contribute to this site, simply head over to our <a href="https://github.com/fapprik/js-tricks.com">GitHub repository</a>, fork it, make your contributions, and send a pull request.</p>
                <p>© 2014 JS-Tricks.com · <a href="/contributors">Contributors</a> · <span class="obfuscated" data-content="Ask us your JavaScript questions!">ask AT js-tricks DOT com</span>
            </div>
        </footer>
        <a href="https://github.com/fapprik/js-tricks.com" id="ribbon">Fork me on GitHub</a>
        <?php js('js/rainbow.js') ?>
        <script>
        var obfuscated = document.querySelectorAll('.obfuscated');
        for (var i = 0; i < obfuscated.length; i++) {
            var address = (obfuscated[i].innerText || obfuscated[i].textContent);
            var content = obfuscated[i].getAttribute('data-content') || address;
            obfuscated[i].innerHTML = '<a href="mailto:' + address.replace(/ AT /g, '@').replace(/ DOT /g, '.') + '">' + content.replace(/ AT /g, '@').replace(/ DOT /g, '.') + '</a>';
        }
        </script>
    </body>
</html>
