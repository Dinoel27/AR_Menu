    var __appState = {
    selected: 0,
    debugToggle: false, 

    dishes: [
        {
            name: "Ramen",
            cuisine: "Japanese",
            model: 'ramen.glb',
            volume: 'ramen.glb',
            scale: 0.6,
            rotation: "0 0 0", 
            position: "0 0.1 0", 
            volumePosition: "0 0.1 0",
            desc: "Ingredients: Bean sprouts, Bamboo shoots, Broths (Miso, Shoyu, Shio, or Tonkotsu), Chashu pork, Chicken, Corn, Ginger, Green onions, Miso paste, Mushrooms, Nori, Ramen noodles, Sesame oil, Sesame seeds, Soy sauce, Tofu. Allergens: Eggs (used in soft-boiled eggs), Sesame (in sesame oil and seeds), Soy (in soy sauce and toppings), Wheat (in noodles and broths)."
        },

        {
            name: "Sashimi Bowl",
            cuisine: "Japanese",
            model: 'sashimi_bowl.glb',
            volume: 'sashimi_bowl.glb',
            scale: 0.09,
            rotation: "0 0 0",
            position: "0 0.1 0",
            volumePosition: "0 0.1 0",
            desc: "Ingredients: Sashimi-grade fish (such as tuna or salmon), rice (check for potential cross-contamination if allergic to gluten), avocado, cucumber, edamame, seaweed (Nori), soy sauce, pickled ginger, wasabi. Allergens: soy sauce, fish. "
        },

        {
            name: "Shake Don",
            cuisine: "Japanese",
            model: 'sushi_bowl.glb',
            volume: 'sushi_bowl.glb',
            scale: 0.095,
            rotation: "0 0 0",
            position: "0 0.1 0",
            volumePosition: "0 0.1 0",
            desc: "Ingredients: Sushi Rice, Salmon (Shake), Avocado, Cucumber, Nori (Seaweed), Sesame Seeds, Soy Sauce (contains soy and wheat; choose gluten-free if needed), Pickled Ginger, Wasabi. Allergens: soy, fish (salmon)."
        },

        {
            name: "Pizza Margarita",
            cuisine: "Italian",
            model: 'pizza.glb',
            volume: 'pizza.glb',
            scale: 0.2,
            rotation: "0 0 0",
            position: "0 0.1 0",
            volumePosition: "0 0.1 0",
            desc: "Ingredients: pizza dough, fresh tomatoes, fresh mozzarella cheese, fresh basil, olive oil, garlic, salt and pepper to taste. Allergens: gluten (dough), dairy (cheese)."
        },

        {
            name: "Bacon Red Pepper Pizza",
            cuisine: "Italian",
            model: 'white_pizza.glb',
            volume: 'white_pizza.glb',
            scale: 0.2,
            rotation: "0 0 0",
            position: "0 0.1 0",
            volumePosition: "0 0.1 0",
            desc: "Ingredients: Pizza dough, fresh tomatoes, mozzarella cheese, bacon, red pepper, black pepper (spice), mushrooms. Allergens: gluten (dough), dairy (cheese)."
        }
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

        let childArray = Array.from(document.querySelector("#models").childNodes);
        let foodModels = Array.from(document.querySelector("#food-models").childNodes);

        // Hide all the dishes but the selected one
        foodModels.forEach(child =>{
            if (child.dataset.name == App.dishes[App.selected].name){
                child.object3D.visible = true;

            } else {
                child.object3D.visible = false;
            }
        });
    }
}

    //Magic reactivity

    const handler = {
        set (target, property, value){
            target[property] = value;
            App.render();
            return true;
        }
    }

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

        document.querySelector("#models").append(model);
        document.querySelector("#food-models").append(volumeModel);

    });

    document.addEventListener('DOMContentLoaded', function(){
        App.selected = 0;
    });
