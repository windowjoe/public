class DPClasses
{
    constructor(dataPage)
    {
        Object.assign(this, dataPage.instanceVars, {
            objects: {},
            classes: false,
            dpHolderAliases: new Map(),
            cF: new ClassFiles()
        });

        this.setClasses(this.p.module.plural);
        this.p.classes = this.classes;
        this.p.objects = this.objects;

        Object.assign(dataPage.instanceVars, {dpClasses: this, classes: this.classes, objects: this.objects});
    }

    /**
     *Sets classes for page
     *
     *@param {object} page - the page object
     *@param {object} custom - objects from /sections/config/<modulePlural>.js to add to this particular page
     *
     */
    setClasses(page, custom = false)
    {
        let s = this;

        if (!this.classes) this.classes = Object.assign({}, s.getUtilities(), s.getCores(), s.getModules(page), s.getPageClasses(page));

        s.mergeClasses(this.classes, custom);
    }

    createInstanceHolders(classes, objects)
    {
        for (let name in classes) {
            let c = classes[name];

            c.name = c.name || name;

            let h = objects[c.name] = new DPHolder({type: c.type, defaultName: name, name, iNames: c.iNames, initialized: false});
        }
    }

    /**
     * creates the instance from the class
     *
     * @objects - the modules to be instantiated
     * @types - the types of modules e.g. core, procedural, modules, etc...
     */
    createInstances(objects, types)
    {
        let dpHolders = this.filterObject(objects, types);

        this.callFunc(dpHolders, 'instantiate');
        this.callFunc(dpHolders, 'setINames', [objects]);
    }

    instantiate(h)
    {
        let args = this.getArgs(h.defaultName);

        h.setObj(new this.classes[h.defaultName].classFile(args));
    }

    getArgs(name)
    {
        //return Object.assign({}, this.pO.instanceVars, this.classes[name].args);

        if (!this.p.objects.instances) {
            this.p.objects.instances = {};
        }

        let args = false;

        if (this.p.objects.instances[name]) {
            args = this.p.objects.instances[name].args;

            if (Array.isArray(args)) {
                args.forEach(function(obj, index) {

                    let map = new Map(Object.entries(obj));

                    map.forEach(function(value, name) {
                        args[name] = value;
                    })
                })
            }
        }

        args = Object.assign({}, this.pO.instanceVars, args);

        return args;
    }

    getInstance(iName)
    {
        return this.objects[this.p.classes[iName].name].o;
    }

    setINames(h, objects = this.objects)
    {
        h = h.o ? h.o : h;

        if (!h.iNames) return false;

        h.iNames.forEach((iName) => {
            h[iName] = objects[iName] ? objects[iName].o : false;
        });
    }

    setINamesDirect(s, iNames, objects = s.page.objects)
    {
        if (!iNames) return false;

        iNames.forEach((className, iName) => {
            let i = objects[iName] || objects[className] || false;

            s[iName] = i.o || i;

            if (!i) console.debug('DPClasses::setINamesDirect::no i for ' + iName + ' => ' + className);
        });
    }

    callFunc(dpHolders, func, args = [])
    {
        let s = this;

        for (let [name, h] of dpHolders) {
            s[func](h, ...args);
        }
    }

    filterObject(objects, types)
    {
        Array.isArray(types) || (types = [types]);

        return  Object.entries(objects).filter((o) => types.includes(o[1].type));
    }

    getUtilities()
    {
        this.cF.setUtilities();

        return this.cF.getUtilities();
    }

    getCores()
    {
        this.cF.setCores();

        return this.cF.getCores();
    }

    getModules(page)
    {
        let modules = imp.dataPageFiles.get(page).modules;
        let slug = {classFile: false, type: 'module'};

        if (!modules) return false;

        this.cF.setModules();

        return this.getClassFiles(modules, this.cF.getModules(), slug);
    }

    getPageClasses(page)
    {
        let files;
        let classes = {};
        let obj = imp.dataPageFiles.get(page).files;
        let slug = {classFile: false, type: 'page'};

        this.cF.setPageClasses();

        for (let section in obj) {
            if (!(files = obj[section].functions)) continue;

            Object.assign(classes, this.getClassFiles(files, this.cF.getPageClasses(), slug));
        }

        return classes;
    }

    getClassFiles(iterable, classFiles, slug = {})
    {
        let s = this;
        let modules = {};
        let exists;
        for (let name in classFiles) {
            let cfName = s.firstLetterToLower(classFiles[name].name) || s.firstLetterToLower(classFiles[name].classFile.name);

            if (!cfName || !(exists = iterable instanceof Map ? iterable.get(cfName) : iterable.includes(cfName))) continue;

            let oo = JSON.parse(JSON.stringify(slug));

            modules[name] = Object.assign(oo, {classFile: classFiles[name], iNames: false}, classFiles[name]);
        }

        return modules;
    }

    mergeClasses(classes, custom)
    {
        if (!custom) return classes;

        for (let name in classes) {
            if (custom[name]) Object.assign(classes[name], custom[name]);
        }

        return true;
    }

    firstLetterToLower(str)
    {
        if (!str) return false;

        let name = str.slice(0, 1).toLowerCase() + str.slice(1);

        return name;
    }
};
