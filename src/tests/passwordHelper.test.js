const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = 'Wellington@6546546'
const HASH = '$2b$04$DiFgpRJQ8G1ptsopyn8uAuSIL8tifXUlAdkBnsXCdONfcrNuMMoSO'

describe('UserHelper test suite', function(){
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA);

        assert.ok(result.length > 10)

    })
    it('Deve comparar uam senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH);
        assert.ok(result)
    })
})