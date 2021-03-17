interface ITarget {
  SetValue: (key: string, value: object) => void;
}

class BindedItem {
  _maping: { [key: string | symbol]: string } = {};
  _target?: ITarget;
  constructor(item: object) {
    const dataBinding = new Proxy(this._dataSource, {
        set: (target, property, value): boolean => {
          target[property] = value;

          if (property in this._maping) {
            this._target.SetValue(this._maping[property],  value);
          }
  
          return true;
        },
        get: (target, property, reciever) => {
          return target[property];
        },
      });
  }

  SetMap(source: string, target: string): void {
    this._maping[source] = target;
  }
  SetTarget(target: ITarget): void {}
}
