if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://dev:Kane7170@ds259109.mlab.com:59109/vidjot'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-development'}
}