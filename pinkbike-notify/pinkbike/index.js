const { Subject } = require('../node_modules/rxjs');
const https = require('https');
const htmlparser = require("htmlparser2");
const select = require('soupselect').select;

const debug = require('debug')('pinkbike');

var DATA = new Array();

var PinkBike = (function () {
    
    function PinkBike(host, path) {
        this._interval = 1300;
        this._post = new Subject();
        this._articles = new Array();

        console.log("PinkBike Init")

        if(!host) this._host = host || "www.pinkbike.com";

        if(!path) this._path = path || "/buysell/list/";
    }

    PinkBike.prototype.start = function() {

        // do initial get
        getData((data) => {
            DATA = data;
        });

        this._process = setInterval(() => {

            getData((newData, error) => {
                let newArticles = compare(newData, DATA);
            
                // console.log("Existing " + D.length + " New " + newArticles.length);
            
                // number of records to remove to give room for new
                let trim = newArticles.length;
            
                // console.log("Trim # " + trim);
            
                if(trim != 0) {
                    for (trim; trim > 0; trim--) {
                        // console.log("Trim one!");
                        DATA.shift();
                    }
            
                    newArticles.forEach((article) => {
                        DATA.push(article)
                        // console.log("New item " + article.id + " " + article.postId + " " + article.title)
                        console.log(article);

                        this._post.next(article)
                    })
                }
            });

        }, this._interval);
    }

    PinkBike.prototype.stop = function() {
        clearInterval(this._process);
    }

    Object.defineProperty(PinkBike.prototype, "post", {
        get: function () {
            return this._post.asObservable();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(PinkBike.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        set: function(value) {
            this._interval = value;
        },
        enumerable: true,
        configurable: true
    });

    return PinkBike;
}());


// INTERNAL STUFF

function processArticle(article) {

    let id = article.attribs.id;
    let url = "";
    let imageUrl;
    let title;
    let category;
    let descText;

    var imageDom = select(article, 'ul.uPhotoSmall li.uImage a');

    // col 1 is image post thumbnail
    // col 2 is text description
    var tableCols = select(article, 'table tr td');

    // some child doms can be empty
    if(imageDom.length > 0) {
        url = imageDom[0].attribs.href;

        imageUrl = imageDom[0].children[0].attribs.src;

        // console.log(url + " " + imageUrl);
    }

    if(tableCols.length > 0) {

        let descDom = tableCols[1];

        if(descDom) {
            let titleDom = select(descDom, 'div a');
            title = titleDom[0].children[0].data.trim() || null;


            let categoryDom = select(descDom, 'div br');
            category = categoryDom[0].next.data.trim() || null;

            // description filed
            let decsColDom = select(descDom, 'table tr td');
            descText = decsColDom[4].children[0].data.trim().substring(0, 100) + "..." || null;
        }
    }

    let a = Article.PbArticle()

    a = {
        id: id,
        title: title,
        category: category,
        imageUrl: imageUrl,
        url: url,
        postId: url.substring(url.length - 8, url.length - 1),
        description: descText
    }

    return a;
}

/**
 * Check if entries in array one present in array two
 * @param {Array} one
 * @param {Array} two
 * @return {Array}
 */
function compare(one, two) {
    let result = new Array();

    one.forEach((item) => {
        let exists = two.find((value => value.id == item.id));
        
        // record new articles
        if(!exists) result.push(item);
    })

    return result;
}

function getData(callback) {
    var options = {
        host: 'www.pinkbike.com',
        path: '/buysell/list/'
    }

    var handler = new htmlparser.DomHandler(function (error, dom) {
        if (error) {
            console.log("Got error");
        } else {
            var dataDom = select(dom, 'div.bsitem');

            let resultArticles = new Array();
    
            dataDom.forEach(article => {
                resultArticles.push(processArticle(article));
            });
            // processArticle(articles[0]);
    
            callback(resultArticles,false);
        }
    });

    let request = https.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            let parser = new htmlparser.Parser(handler);
                parser.write(data);
                parser.end();
        });
    });
    
    request.on('error', function (e) {
        callback([], e);
    });
    
    request.end();
}

var Article = require("./article");
module.exports.PbArticle = Article.PbArticle;

module.exports.PinkBike = PinkBike;
