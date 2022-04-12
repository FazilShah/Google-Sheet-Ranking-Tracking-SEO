function GetRank(keyword, domain, location) {

  //let api_key = "b1e9eb69d0c51feaf7367794344b479bdcb98c5b0873d408586bbdfba2bf5074";

  const response = UrlFetchApp.fetch("https://serpapi.com/search.json?q=" + keyword +"&hl=en"+"&gl="+location+"&num=100&engine = Google&google_domain=google.co.uk&api_key=b1e9eb69d0c51feaf7367794344b479bdcb98c5b0873d408586bbdfba2bf5074");
 

  const json = response.getContentText();
  const results = JSON.parse(json);
  const final = results.organic_results;
  for(let i = 0; i< final.length; i++){
   rank = 'Not in Top 100';
   links = final[i].link;
   if(links.includes(domain)){
     rank = final[i].position;
     show = final[i].link;
     break;
     
   }

  }
  console.log(rank, show);
  return [rank, show]



}

function update(){

const ss = SpreadsheetApp.getActive().getActiveSheet()
  const las_row = ss.getLastRow();
  const domain_in_sheet = ss.getRange(1,2).getValue();
  const location_in_sheet = ss.getRange(2,2).getValue();
  for(var i = 5; i<las_row+1;i++){
    var keyword_in_sheet = ss.getRange(i,1).getValue();
    
    var newValue = ss.getRange(i, 2);
    var newValue2 = ss.getRange(i,3);
    var resulti = GetRank(keyword_in_sheet, domain_in_sheet, location_in_sheet);
    var rankinggg = resulti[0];
    var linkinggg = resulti[1];
    newValue.setValue(rankinggg);
    newValue2.setValue(linkinggg);

  }
}


