const ExcelJS = require('exceljs');

import { test , expect } from '@playwright/test';

async function writeExcelFile(searchText,replaceText,change,filePath)
{
    const workBook = new ExcelJS.Workbook();
    
    await workBook.xlsx.readFile(filePath);

    const workSheet = workBook.getWorksheet('Sheet1');

   const outputs =  readExcelFile(workSheet,searchText);

  const row = workSheet.getRow(outputs.row);
const cell = row.getCell(outputs.column+change.colChange);

   cell.value = replaceText;
   await workBook.xlsx.writeFile(filePath);

}

 function readExcelFile(workSheet,searchText)
{   
    let outputs = {row: -1,column:-1};
        workSheet.eachRow((row,rowNumber) => 
    {
        row.eachCell((cell,colNumber)=>
        {
            if(cell.value === searchText)
            {
                outputs.row = rowNumber;
                outputs.column = colNumber;
            }
        });
    });
    return outputs;
}

test('Download and upload validation',async ({page}) =>
{
    const textSearch = "Mango";
    const updateValue = "350";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{ name : 'Download'}).click();
    const download = await downloadPromise;
    await download.saveAs("C:/Users/91978/Downloads/download.xlsx");
    await writeExcelFile("Mango","350",{rowChange:0,colChange:2},"C:/Users/91978/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/91978/Downloads/download.xlsx");

    // const textLocator =  page.getByText(textSearch);
    const desiredText = await page.getByRole('row').filter({ hasText : textSearch });
    await expect(desiredText.locator("#cell-4-undefined")).toContainText(updateValue);
    await page.pause();
})

 

