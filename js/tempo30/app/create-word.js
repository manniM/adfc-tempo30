define('tempo30/app/create-word', [
    'jquery',
    'lib/jszip-utils/jszip-utils',
    'lib/docxtemplater/docxtemplater-latest',
    'lib/file-saver/FileSaver',
], function ($, JSZipUtils, Docxtemplater, FileSaver) {

    function download(data) {
	console.log('jszip');
	JSZipUtils.getBinaryContent(requirejs.toUrl('docx/antrag-tempo30-template.docx'),function(err,content){
	    console.log('a');
            if (err) { throw e;}
            doc=new Docxtemplater(content);
	    //set the templateVariable
	    var datum = new Date();
	    datum.setDate(datum.getDate()+30);
	    var antwortBis = datum.getDate()+ "." + (datum.getMonth()+ 1)+"." + datum.getFullYear();
            doc.setData( {'AntragStr':data.antrag_str,
			  'Name': data.name,
			  'Bezirk':data.ort[0].bezirk_name,
			  'AdrStr':data.str+' '+data.hausnr,
			  'AdrPLZ':data.plz,
			  'AdrOrt':'Hamburg',
			  'Polizei':data.polizei[0].name,
			  'PolizeiStr':data.polizei[0].strasse,
			  'PolizeiPLZ':data.polizei[0].plz,
			  'PolizeiOrt':'Hamburg',
			  'NO2':data.umweltdaten.no2.val_short,
			  'PM10':data.umweltdaten.pm10.val_short,
			  'PM25':data.umweltdaten.pm25.val_short,
			  'LaermTagKl':data.umweltdaten.laerm_tag.val_short,
			  'LaermNachtKl': data.umweltdaten.laerm_nacht.val_short,
			  'LaermTagWertebereich': data.umweltdaten.laerm_tag.val_long,
			  'LaermNachtWertebereich': data.umweltdaten.laerm_nacht.val_long,
			  'antwortDatum': antwortBis,
			 }); 
            doc.render(); 
            out=doc.getZip().generate({type:"blob"}); 
	    saveAs(out,"tempo30-antrag.docx");
	});
    }

    return { 
	'download': download
    };
});