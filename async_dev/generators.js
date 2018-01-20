function* gen() {
    let b = yield 1;
    console.log('b', b);
    let a = yield 2;
    return a + 3;
}

const genObj = gen();
console.log(genObj.next(1));
console.log(genObj.next(1));

function* genWithError() {
    try {
        yield 1;
    } catch (e) {
        console.log(e);
    }

    yield  2;
    throw 'Oops';
}

const genObj2 = genWithError();

console.log('\n---  THROWING ERROR');
console.log(genObj2.next());
console.log(genObj2.throw('Super Error'));
