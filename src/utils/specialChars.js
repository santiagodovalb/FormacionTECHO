export default function isValid(str){
    return !/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(str)
   }