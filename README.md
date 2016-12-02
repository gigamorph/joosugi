# Joosugi

Joosugi aims to be a library that acts as a [IIIF](http://iiif.io)-compliant interface to annotation data store(s).

## Build
```bash
npm install
npm run build
```
Will generate `dist/joosugi.js`

## Use

```javascript
var model = new joosugi.AnnotationExplorer({
  dataSource: dataSource
});
```
