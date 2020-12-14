class DPContainers
{
    constructor(dataPage)
    {
        Object.assign(this, {
        }, dataPage.instanceVars);

        this.setDefaultContainers();
        this.setContainerObjects(this.p.containers);

        this.containers = this.p.containers; //must be set after prev two func calls

        Object.assign(dataPage.instanceVars, {dpContainers: this, containers: this.p.containers});
    }

    getId(entity)
    {
        if (!entity) return false;

        let containerType = this.dpForms.getContainerType(entity);

        if (containerType === false && typeof entity === 'string')
            return this.containers[entity].attributes.id;

        return this.containers[containerType].attributes.id;
    }

    setContainerObjects(userContainers)
    {
        let s = this;
        let eO = s.p.objects[s.p.classes.eO.name].o;
        let containers = s.defaultContainers.concat(userContainers);

        containers.forEach(function(container, index) {
            if (container.order) {
                s.setContainerParentContainer(container);
                s.setContainerID(container.name, container, s.pO.getModule());
                s.setContainerClassName(container.name, container);
                s.setContainerHeader(container.name, container, s.pO.getModule());

                let setContainer = eO.setContainerOptions(container);

                containers[index] = Object.assign({}, container, setContainer);
            }
        });

        s.p.containers = s.arrToObj(containers, 'name');
        s.p.containers.update = JSON.parse(JSON.stringify(s.p.containers.fetch));
        s.p.containers.update.name = 'update';

        delete s.p.containers.update.order;
    }

    createContainers()
    {
        let s = this;
        let containers = s.page.containers;
        let elementsMaker = s.page.objects[s.page.classes.createHTMLElements.name].o;
        let sM = s.page.objects[s.page.classes.sM.name].o;

        let containersArr = s.orderObjByProp(containers, 'order');

        containersArr.forEach(function(container) {
                var element = elementsMaker.createHTMLElement(container, container.header);
                    sM.insertElement(containers[container.parentContainer].attributes.id, element);
        });
    }

    setContainerParentContainer(container)
    {
        if (!container.parentContainer) container.parentContainer = 'main';
    }

    setContainerID(name, container, module)
    {
        if (!container.attributes) container.attributes = {};

        if (!container.attributes.id) {
            container.attributes.id = name + '_div_' + module;
        }
    }

    setContainerClassName(name, container)
    {
        let className = name + '_div ' + container.attributes.id;
        let currClassName = container.className;

        container.className = (currClassName) ? currClassName + ' ' + className : className;
    }

    setContainerHeader(containerName, container, module)
    {
        let s = this;
        let sM = s.page.objects[s.page.classes.sM.name].o;

        if (containerName === 'main' && container.header === true) {
            container.header = '<h1>' + sM.ucWords(module) + '</h1>';
        } else if (container.header === true) {
            if (containerName === 'fetch') containerName = 'Manage';

            container.header = '<h2><small>' + sM.ucWords(containerName) + ' ' + sM.ucWords(module) + '</small></h2>';
        }
    }

    setDefaultContainers()
    {
        this.defaultContainers = [
            //if parentContainer is not set, it is set to main
            {name: 'main', order: '100', className: 'md-10 main', parentContainer: 'primaryRow', header: true},
            {name: 'headerBar', order: '150'},
            {name: 'metaBtns', order: '300', parentContainer: 'headerBar'},
            {name: 'add', order: '400', header: true},
            {name: 'fetch', order: '500', header: true},
            {name: 'update'},
            {name: 'primaryRow', attributes: {id: 'primary_row'}, parentContainer: true},
            {name: 'flash', attributes: {id: 'success_message_div'}, parentContainer: 'container_fluid'},
            {name: 'loading', attributes: {id: 'loading_image_div'}, parentContainer: 'container_fluid'},
            {name: 'renderType', attributes: {id: 'form'}}
        ];
    }

    arrToObj(arrOfObjects, prop)
    {
        var objFromArr = {};

        arrOfObjects.forEach(function(obj) {
            objFromArr[obj[prop]] = obj;
        });

        return objFromArr;
    }

    orderObjByProp(arrOfObjects, propName)
    {
        let s = this;
        let localArrOfObjects = JSON.parse(JSON.stringify(arrOfObjects));

        if (typeof localArrOfObjects === 'object') {
            localArrOfObjects = s.objToArr(localArrOfObjects, propName);
        }

        localArrOfObjects.forEach(function(obj, index) {
            if (!obj[propName]) delete localArrOfObjects[index];
        });

        //sort categories alphabetically ASC
        localArrOfObjects.sort(function(a, b) {
            if (a[propName] && b[propName]) {
                return a[propName].localeCompare(b[propName]);
            }
        });

        return localArrOfObjects;
    }

    objToArr(obj)
    {
        var arr = [];
        var index = 0;

        for (var name in obj) {
            if(!obj[name].name) obj[name].name = name;
            arr[index] = obj[name];
            index++;
        }

        return arr;
    }

    getID(entity)
    {
        return this.getId(entity);
    }
};
