import getConstant from './get-constants';
import { LANGUAGES } from './languages';

describe('getConstants', () => {
  describe('Clients', () => {
    describe('English tests', () => {
      it('should return "Client already exists" when the key is NOT_FOUND and the lang is not defined', () => {
        expect(getConstant().CLIENT.ALREADY_EXISTS).toBe(
          'Client already exists',
        );
      });
    });

    describe('Portuguese tests', () => {
      it('should return "Cliente já existe" when the key is NOT_FOUND and the lang is pt_BR', () => {
        expect(getConstant(LANGUAGES.PT_BR).CLIENT.ALREADY_EXISTS).toBe(
          'Cliente já existe',
        );
      });
    });
  });
});
