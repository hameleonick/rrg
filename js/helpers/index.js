import EN from "../langs/en";
import RU from "../langs/ru";
import UA from "../langs/ua";
import PL from "../langs/pl";

export function StringLocalisation( key = "", lang = "EN", params) {

	var dictionaries = {EN, RU, UA, PL};
	
	if(!dictionaries[lang] || !dictionaries[lang][key]){
		throw new Error("language or key does not exist");
		return false;
	}
	return dictionaries[lang][key];

}

