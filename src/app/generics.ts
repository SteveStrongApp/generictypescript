

export interface Action<T> {
    (item: T): void;
}

export interface Func<T, TResult> {
    (item: T): TResult;
}

export class myObject {
    _index: number;
    myParent: myObject;
    list: myList<myObject> = new myList<myObject>();

    applyToSubComponents<T>(func: Action<T>, deep: boolean) {
        this.list.applyToSubComponents<T>(func, deep);
    }
}

export class myList<T extends myObject> extends Array<T> {

    applyToSubComponents<T>(func: Action<T>, deep: boolean) {
        this.forEach(item => {
            func.apply(this, item);
            deep && item.applyToSubComponents<T>(func, deep);
        });
    }
}

export class myComponent<T extends myObject> extends myObject {

    _subcomponents: myList<T> = new myList<T>();

    applyToSubComponents<T>(func: Action<T>, deep: boolean) {
        this._subcomponents.applyToSubComponents<T>(func, deep);
    }

    addSubcomponent(obj: T) {
        if (!obj) return;
        if (!obj.myParent) {
            obj.myParent = this;
            obj._index = this._subcomponents.length;
        }
        this._subcomponents.push(obj);
        return obj;
    }
}

export interface iObject {
    myParent: iObject;
    _index: number;
    _myGuid: string;

    asReference(): string;
    getChildAt(i: number): iObject;
    applyToSubComponents(func: Action<iObject>, deep: boolean);
    mapToSubComponents(func: Func<iObject, iObject>, deep: boolean): any;
}

export class foObject implements iObject {
    myParent: iObject = undefined;
    myName: string = 'unknown';
    _index: number;
    _myGuid: string;


    asReference() {
        if (this.myParent === undefined) {
            return "\'root\'";
        }
        return this.myName + "." + this.myParent.asReference();
    }

    get hasParent() {
        return this.myParent ? true : false;
    }

    getChildAt(i: number): iObject {
        return undefined;
    }

    applyToSubComponents(func: Action<iObject>, deep: boolean) {
    }
    mapToSubComponents(func: Func<iObject, iObject>, deep: boolean): any {
    }
}

export interface iNode extends iObject {

    override(properties?: any);
    addSubcomponent(obj: iObject);
    removeSubcomponent(obj: iObject);
}

export class foCollection<T extends iObject> extends foObject {
    private _memberType;
    private _members: Array<T>;
    get length() {
        return this._members.length;
    }
    addMember(obj: T) {
        this._members.push(obj);
    }
    removeMember(obj: T) {
        this._members.push(obj);
    }
    applyToSubComponents(func: Action<T>, deep: boolean) {
        this._members.forEach(item => {
            func(item);
            deep && item.applyToSubComponents(func, deep);
        });
    }

    mapToSubComponents(func: Func<T, T>, deep: boolean): any {
        let result = this._members.map(item => {
            let found = [func(item)];
            if (deep) {
                let child = item.applyToSubComponents(func, deep);
                found.concat(child);
            }
            return found;
        });
        return result;
    }
}

export class foNode<T extends iObject> extends foObject implements iNode {

    _index: number = 0;
    _myGuid: string;
    _subcomponents: foCollection<T>;

    override(properties?: any) {
        return this;
    }

    addSubcomponent(obj: T) {
        if (!obj) return;
        if (!obj.myParent) {
            obj.myParent = this;
            obj._index = this._subcomponents.length;
        }
        this._subcomponents.addMember(obj);
        return obj;
    }

    removeSubcomponent(obj: T) {
        if (!obj) return;
        if (obj.myParent == this) {
            obj.myParent = undefined;
            obj._index = 0;
        }
        this._subcomponents.removeMember(obj);
    }

    applyToSubComponents(func: Action<iObject>, deep: boolean) {
        this._subcomponents.applyToSubComponents(func, deep);
    }
    mapToSubComponents(func: Func<iObject, iObject>, deep: boolean): any {

    }


}

