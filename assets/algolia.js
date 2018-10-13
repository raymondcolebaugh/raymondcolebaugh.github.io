$(function() {
    if (typeof algoliasearch !== 'undefined') {
        $("#search .input-group").removeClass('hide');
        var client = algoliasearch('VTA7XL87VN', 'bbda21ebd6d41e8c63693c92ddd88304');
        var index = client.initIndex('colebaugh.com');
        autocomplete('#search-input', {hint: false}, [
                {
                    source: autocomplete.sources.hits(index, {hitsPerPage: 10}),
                    displayKey: 'title',
                    templates: {
                        suggestion: function(suggestion) {
                            if (suggestion._highlightResult.title) {
                                return suggestion._highlightResult.title.value;
                            }
                        }
                    }
                }
        ]).on('autocomplete:selected', function(event, suggestion, dataset) {
            console.log(suggestion, dataset);
            _paq.push(['trackSiteSearch', $("#search-input").val(), false, false]);
            window.location.href = suggestion.url;
        });
    }
});
