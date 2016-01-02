(function() {
    if (location.hostname === 'localhost') return;
    var isAuthor = window.localStorage && window.localStorage.getItem('isAuthor');

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-26427038-2', 'aaronfranks.com', { siteSpeedSampleRate: 50 });
    ga('set', 'dimension1', isAuthor ? 'author' : 'viewer');
    ga('send', 'pageview');
}());

