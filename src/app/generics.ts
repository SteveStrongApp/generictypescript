

export interface Action<T>
{
    (item: T): void;
}

export interface Func<T,TResult>
{
    (item: T): TResult;
}

export interface iObject {  
    myParent: iObject;
    asReference(): string;
    getChildAt(i: number): iObject;
    applyToSubComponents(func: Action<iObject>, deep: boolean);
    mapToSubComponents(func: Func<iObject,iObject>, deep: boolean): any;
}

export class foObject implements iObject {
    myParent: iObject = undefined;
    myName: string = 'unknown';

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
    mapToSubComponents(func: Func<iObject,iObject>, deep: boolean): any {

    }
}

export interface iNode extends iObject {
    _index: number;
     _myGuid: string;
    override(properties?: any);
    addSubcomponent(obj: iNode);
    removeSubcomponent(obj: iNode);   
}

export class foCollection<T extends iNode> extends foObject {
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

    mapToSubComponents(func: Func<T,T>, deep: boolean): any {
        let result = this._members.map(item => {
            let found = [func(item)];
            if ( deep ) { 
                let child = item.applyToSubComponents(func, deep);
                found.concat(child);
            }
            return found;
        });
        return result;
    }
}

export class foNode<T extends iNode> extends foObject implements iNode { 

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

    applyToSubComponents(func: Action<T>, deep: boolean) {
        this._subcomponents.applyToSubComponents(func, deep);
    }
}

