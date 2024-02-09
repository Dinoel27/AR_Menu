    var __appState = {
    selected: 0,
    debugToggle: false, 

    dishes: [
        {
            name: "Ramen",
            cuisine: "Japanese",
            model: 'ramen.glb',
            volumeModel: 'ramen.glb',
            Animation: {clip:0, action: 'play'},
            vAnimation: {clip:0, action: 'play'},
            scale: 0.5,
            scale2: 2,
            rotation: "45 0 0", 
            position: "0 0 0", 
            volumePosition: "-0.01 -0.015 -0.01",
            desc: "Ingredients: Bean sprouts, Bamboo shoots, Shoyu broth, Chashu pork, Chicken, Corn, Ginger, Green onions, Miso paste, Mushrooms, Nori, Ramen noodles, Sesame oil, Sesame seeds, Soy sauce, Tofu.",
            allergens: "Allergens: Eggs (used in soft-boiled eggs), Sesame (in sesame oil and seeds), Soy (in soy sauce and toppings), Wheat (in noodles and broths).",
            recipe: "Bring broth to a boil. \nAdd vegetables and meat. \nWait for broth to smell tasty and add noodels.\n Etc",
            ingredients: "beans, fish, rice, broth etc",
        },

        {
            name: "Sashimi Bowl",
            cuisine: "Japanese",
            model: 'sashimi_bowl.glb',
            volumeModel: 'sashimi_bowl.glb',
            Animation: {clip:0, action: 'play'},
            vAnimation: {clip:0, action: 'play'},
            scale: 0.08,
            scale2: 0.35,
            rotation: "45 0 0",
            position: "0 0 0",
            volumePosition: "-0.01 -0.010 -0.01",
            desc: "Ingredients: Sashimi-grade fish (such as tuna or salmon), rice (check for potential cross-contamination if allergic to gluten), avocado, cucumber, edamame, seaweed (Nori), soy sauce, pickled ginger, wasabi.",
            allergens: "Allergens: soy sauce, fish.",
            recipe: "Cook rice. \nAdd fish. \nAdd vegetables. \nAdd other testy foods.\n",
            ingredients: "tuna or salmon, rice, soy sauce, avocado, cucumber",
        },

        {
            name: "Shake Don",
            cuisine: "Japanese",
            model: 'sushi_bowl.glb',
            volumeModel: 'sushi_bowl.glb',
            Animation: {clip:0, action: 'play'},
            vAnimation: {clip:0, action: 'play'},
            scale: 0.085,
            scale2: 0.35,
            rotation: "45 0 0",
            position: "0 0 0",
            volumePosition: "-0.01 0.05 -0.01",
            desc: "Ingredients: Sushi Rice, Salmon (Shake), Avocado, Cucumber, Nori (Seaweed), Sesame Seeds, Soy Sauce (contains soy and wheat; choose gluten-free if needed), Pickled Ginger, Wasabi.",
            allergens: "Allergens: soy, fish (salmon).",
            recipe: "Cook tasty food. \nEnjoy food.\n Live wholesome life.\n",
            ingredients: "nori, rice, salmon, sesame seeds",
        },

        // {
        //     name: "Pizza Margarita",
        //     cuisine: "Italian",
        //     model: 'pizza.glb',
        //     volume: 'pizza.glb',
        //     Animation: {clip:0, action: 'play'},
        //     vAnimation: {clip:0, action: 'play'},
        //     scale: 0.2,
        //     scale2: 0.6,
        //     rotation: "45 0 0",
        //     position: "0 0 0",
        //     volumePosition: "0.01 0.05 0.01",
        //     desc: "Ingredients: pizza dough, fresh tomatoes, fresh mozzarella cheese, fresh basil, olive oil, garlic, salt and pepper to taste.",
        //     allergens: "Allergens: gluten (dough), dairy (cheese).",
        // },

        // {
        //     name: "Bacon Red Pepper Pizza",
        //     cuisine: "Italian",
        //     model: 'white_pizza.glb',
        //     volume: 'white_pizza.glb',
        //     Animation: {clip:0, action: 'play'},
        //     vAnimation: {clip:0, action: 'play'},
        //     scale: 0.2,
        //     scale2: 0.6,
        //     rotation: "45 0 0",
        //     position: "0 0 0",
        //     volumePosition: "0.01 0.05 0.01",
        //     desc: "Ingredients: Pizza dough, fresh tomatoes, mozzarella cheese, bacon, red pepper, black pepper (spice), mushrooms.",
        //     allergens: "Allergens: gluten (dough), dairy (cheese).",
        // },
    ],

    next: function (){
        if (this.selected < this.dishes.length - 1){
            this.selected++
        }
    },

    prev: function (){
        if (this.selected > 0) {
            this.selected--
        }
    },

    render: function () {
        let selectedDish = this.dishes[this.selected];

        document.querySelector("#name").innerText = selectedDish.name;
        document.querySelector("#cuisine").innerText = selectedDish.cuisine;
        document.querySelector("#desc").innerText = selectedDish.desc;
        document.querySelector("#allergens").innerText = selectedDish.allergens;
        document.querySelector("#recipe").innerText = selectedDish.recipe;
        document.querySelector("#ingredients").innerText = selectedDish.ingredients;

        let childArray = Array.from(document.querySelector("#models").childNodes);
        let foodModels = Array.from(document.querySelector("#food-models").childNodes);

        // Hide all the dishes but the selected one
        childArray.forEach(child =>{
            if (child.dataset.name == App.dishes[App.selected].name){
                child.object3D.visible = true;

            } else {
                child.object3D.visible = false;
            }
        });

        foodModels.forEach(child =>{
            if(child.dataset.name == App.dishes[App.selected].name){
                child.object3D.visible = true;
            } else {
                child.object3D.visible = false;
            }
        });
    },
}

    //Magic reactivity

    const handler = {
        set (target, property, value){
            target[property] = value;
            App.render();
            return true;
        }
    };

    //Magic reactivity
    const App = new Proxy(__appState, handler);

    App.dishes.forEach(dish =>{
        let model = document.createElement("mr-model");
        model.setAttribute("src", "./assets/" + dish.model);
        model.dataset.name = dish.name;
        model.dataset.position = dish.position;
        model.dataset.rotation = dish.rotation;
        model.object3D.visible = false; 

        let volumeModel = document.createElement("mr-model");

        volumeModel.setAttribute("src", "./assets/" + dish.volumeModel);
        volumeModel.dataset.name = dish.name;
        volumeModel.dataset.position = dish.volumePosition;
        volumeModel.object3D.visible = false;

        Object.assign(model.style, {
            scale: dish.scale
        })

        Object.assign (volumeModel.style, {
            scale: dish.scale2
        })

       

        document.querySelector("#models").append(model);
        document.querySelector("#food-models").append(volumeModel);

        model.onLoad = () => {
            model.components.set('animation', dish.animation);
        }

        volumeModel.onload = () =>{
            volumeModel.components.set('animation', dish.vAnimation);

        }

    });

    document.addEventListener('DOMContentLoaded', function(){
        App.selected = 0;
    });



