import { getLanguage, LANGUAGES, LANG_DOCS } from './languages';
import * as enUsConstants from './en_US';
import * as ptBrConstants from './pt_BR';

const getConstant = (lang: LANGUAGES = LANG_DOCS) => {
  const langsMapped = {
    [LANGUAGES.EN_US]: enUsConstants,
    [LANGUAGES.PT_BR]: ptBrConstants,
  };

  return langsMapped[getLanguage(lang)];
};

export default getConstant;
