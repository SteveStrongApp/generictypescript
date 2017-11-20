interface KeyValuePair<K, V> extends Array<K | V> {
    0: K,
    1: V
}


//https://www.typescriptlang.org/docs/handbook/mixins.html
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

//this is a type alias 
type strongbro = 'steve' | 'stu' | 'don';

class root {

}

class baseObj<A extends root> extends root {
    private ccc: KeyValuePair<number,string> = [1, 'steve'];
    

    private xEnum: strongbro = 'steve';

    doInit() {
        this.xEnum = 'stu';
    }

    logAndReturn<C,A>(thing: C, other: A): C {
        console.log(thing);
        return thing;
    }
}