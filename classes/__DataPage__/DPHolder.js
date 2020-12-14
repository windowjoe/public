class DPHolder
{
    constructor(props)
    {
        this.o = {};
        Object.assign(this, {props: props}, props);
    }

    setObj(o)
    {
        this.o = Object.assign(o, this.props);
    }
};
