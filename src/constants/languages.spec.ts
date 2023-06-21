import { getLanguage, LANGUAGES, LANG_DOCS } from './languages';
import * as lang from './languages';

describe('getLanguage', () => {
  describe('when getLanguage has been called passing parameter (LANGUAGES.EN_US)', () => {
    it('then it should return a value equal to (LANGUAGES.EN_US)', () => {
      expect(getLanguage(LANGUAGES.EN_US)).toBe(LANGUAGES.EN_US);
    });
  });

  describe('when getLanguage has been called passing parameter (LANGUAGES.EN_US) and isLangAllowed return false', () => {
    it('then it should return a value equal to (LANG_DOCS)', () => {
      jest.spyOn(lang, 'isLangAllowed').mockReturnValue(false);
      expect(getLanguage(LANGUAGES.PT_BR)).toBe(LANG_DOCS);
    });
  });
});
