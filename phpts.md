# Proč a jak přejít na psaní backend kódu z PHP na JavaScript

Teď se backend kód píše v PHP, potom by se mohl psát v JavaScriptu. JavaScript je jazyk, kterému se úplně nedá vyhnout, vždy bude minimálně na webovém klientu, pokud budeme testovat s Cypress, tak i tam. Chci tady popsat výhody přístupů, kdybychom zůstali na PHP nebo přešli na JavaScript.

# PHP

## Už v tom máme napsaný backend

Hlavní výhoda PHP je, že stávající backend kód je napsaný právě v PHP. Pokud to teď přepisujeme, tak stále můžeme využívat třídy, které nebyly přepsané. Nebudeme v přechodné fázi na jiný jazyk.

## Už to běží na produkci

Už teď víme, jak se PHP chová na produkci, máme s tím zkušenost, jak nastavit parametry deploymentu, je to připravené.

# Js - TypeScript

Co navrhuju je jedna z těchto možností:
1. psát s `*.js` s JSDoc anotacemi a potom používat `tsc` použe na kontrolu typů. Tady bychom psali čistý JavaScriptový kód a pouze bychom pomocí TypeScriptu ověřovali, že máme správně typy. Funguje to cca podobně, jako [PHPStan](https://phpstan.org/).
1. psát přímo [typescript](https://www.typescriptlang.org/), to znamená `*.ts` soubory a potom to kompliovat pomocí `tsc` kompilátoru. Tady bychom se nevyhli už nějaké pipelině, nebyl by to čistý JavaScript, který můžeme pastnout do konzole a bude to fungovat, musela by tam být kompilační pipelina. Na druhou stranu bychom mohli psát úspornějsí kód a plně využívat TypeScriptové featury.

## Javascriptu se nevyhneme

Tím, že bychom Javascript psali na backendu, zredukujme počet technologií, které musíme používat. Javascriptu se zbavit nedá, vždy bude v prohlížeči. Nedá se začít psát PHP na frontendu, kdežto Javascript se na backendu dá psát.

Tím se zmenší počet technologií, které používáme, místo toho, abychom více věcí uměli napůl, budeme 1 jazyku více rozumět. Zároveň můžeme sdílet znalosti těch věcí okolo, jako jo build system, integrace s IDE, frameworky jako vue, ..

## Chceme přepsat stávající kód

Teď jsme si řekli, že stávající kód neni, tak jak bychom to chtěli psát a teď např. budeme přidávat routy pomocí symfony. Pokud to děláme teď, je dobré si říct, jestli už to rovnou nepsat v jiném jazyku, místo toho, abychom to přepsali do jiného stylu PHP. Pokud bychom se pro něco jiného než PHP rozhodli po tom přepisu, tak to bude těžší než teď a duplikovalo by se to úsilí.

## Můžeme snáze přejít na single page app

Když bychom renedrovali web na serveru pomocí javascriptu, bylo by potom jednodušší přejít na renderování na klientu. Vzali bychom ten kód, který bude renderovat web na serveru pomocí frameworku jako je vue.js nebo react a přemístili ho na klient.

To by byl jednodušší přechod, než vzít html kód vygenerovaný v PHP anebo smarty a přepisovat to ručně.

## Javascript má lepší příběh s typy

I když jsou v PHP také typy a kód se dá anotovat pomocí typů, tak javascript má v tomto výhodu, že se dají knihovny typovat externě. Takže někdo může přijít, kdo není autor knihovny a popsat typy v `.d.ts` souboru a commitnout ho do community repository [Definitely typed](https://github.com/DefinitelyTyped/DefinitelyTyped) a nemusí se čekat na autora.

Pokud bychom se rozhodli pro přímo TypeScript, ten už má podporu více typových featur než čisté PHP bez PHPStanu, jako jsou generika.

## TypeScript/JavaScript/Node.js je populárnější jazyk/technologie

Podle [stackoverflow.com ankety](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-wanted) říká toto o PHP
### Řebřížek nejrozšířenějších
Ovlivňuje, jak moc technologie budou fungovat out-of-the-box, jak bude vypadat tooling, podpora IDE, jestli budou napsané knihovny ...
#### Nejrozšířenější jazyky
- JavaScript (1. místo)
- PHP (8. místo)
- TypeScript (9. místo)
#### Nejrozšířenější webové frameworky
- jQuery (1. místo)
- React.js (2. místo)
- vue.js (7. místo)
- Symfony (14. místo)
#### Nejrozšířenější technologie
- Node.js (1. místo)
### Řebříček nejoblíbenějších/obávaných 
Ovlivňuje, jak těžce/lehce se budou shánět/udržovat vývojáři.
#### Nejvíce milované jazyky
- TypeScript (2. místo)
#### Nejvíce obávané jazyky
- PHP (6. místo)
#### Nejvíce chtěné jazyky
- JavaScript (2. místo)
- TypeScript (4. místo)
#### Nejvíce milované frameworky
- Vue.js (3. místo)
- Express (4. místo)
- Symfony (12. místo)
#### Nejvíce obávané frameworky
- jQuery (3. místo)
- Symfony (5. místo)
#### Nejvíce chtěné frameworky
- Vue.js (2. místo)

# Jak přejít na JS

Můžeme začít postupně, stačí, když kus kódu pošleme na nějakou jinou routu na JavaScriptu, např. zavoláme `http://localhost:8081/moje-javascript-routa` s jsonovým payloadem která vyrenderuje část html, které potom includujeme do zbytku html, které bylo vytvořeno PHPkem.

### Příklad:
#### Controller.php
```
$client = new Guzzle\Http\Client();
$res = $client->request('GET', 'http://localhost:8081/moje-javascript-routa')
$smarty->assign('includeVue', $res->getBody());
```

#### file.tpl
```
<div>
  <h1>Napsáno phpkem</h1>
  {$includeVue}
</div>
```

Malé úpravy bychom ještě pořád dělali v PHP, kdežto větší věci by se psaly už v JavaScriptu, postupně s novými featurami bychom se zbavovali zbytků PHP. Až už by toho bylo málo, tak bychom celý zbytek přepsali a odstranili PHP nadobro.