const MAXCHARS = 140;

/**
 * Return an array of tweets
 *
 * @param {String} Long tweet string
 * @return {Array} tweets
 */
function process(tweet) {
    if (!tweet) {
        throw "Please, enter a valid tweet";
    }

    let out = [];

    tweet = normalize(tweet);

    if (tweet.length > MAXCHARS) {
        let currentLimit = 1;
        let buff = '';
        let preCount = 1;
        let prefix = `${preCount}/`;
        let wl;
        // Find possible words
        const words = tweet.split(' ');
        // Walk through words
        words.map((word) => {
            wl = word.length;
            if (currentLimit + (wl + 1) + prefix.length >= MAXCHARS) {
                preCount++;
                prefix = `${preCount}/`;
                buff += '.'
                out.push(buff);
                currentLimit = 1;
                buff = '';
            }
            buff += buff.length > 0 ? ` ${word}` : `${prefix}${capitalize(word)}`;
            currentLimit += wl;
        });
    } else {
        out.push(tweet);
    }
    return out;
}

/**
 * Capitalize a word
 *
 * @param {String} Word to be capitalized
 * @return {String}
 */
function capitalize(word) {
    return `${word[0].toUpperCase()}${word.substr(1)}`;
}

/**
 * Normalize a tweet
 *
 * @param {String} Tweet to be normalized
 * @return {String} Tweet normalized
 */
function normalize(text) {
    // Removing line breaks and duplicated white spaces
    return text = text.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
}

module.exports = {
    process
}
