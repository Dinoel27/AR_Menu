    var __appState = {
    selected: 0,
    debugToggle: false, 

    dishes: [
        {
            name: "Ramen",
            cuisine: "Japanese",
            model: 'ramen.glb',
            scale: 0.09,
            rotation: "45 0 0",
            position: "0 0 0",
            desc: "Ingredients: Bean sprouts, Bamboo shoots, Broths (Miso, Shoyu, Shio, or Tonkotsu), Chashu pork, Chicken, Corn, Ginger, Green onions, Miso paste, Mushrooms, Nori, Ramen noodles, Sesame oil, Sesame seeds, Soy sauce, Tofu. Allergens: Eggs (used in soft-boiled eggs), Sesame (in sesame oil and seeds), Soy (in soy sauce and toppings), Wheat (in noodles and broths)."
        },

        {
            name: "Sashimi Bowl",
            cuisine: "Japanese",
            model: 'sashimi_bowl.glb',
            scale: 0.05,
            rotation: "45 0 0",
            position: "0 0 0",
            desc: "Ingredients: Sashimi-grade fish (such as tuna or salmon), rice (check for potential cross-contamination if allergic to gluten), avocado, cucumber, edamame, seaweed (Nori), soy sauce, pickled ginger, wasabi. Allergens: soy sauce, fish. "
        },

        {
            name: "Black Trumpet Pasta",
            cuisine: "Italian",
            model: 'black_pasta.glb',
            scale: 0.07,
            rotation: "45 0 0",
            position: "0 0 0",
            desc: "Ingredients: Black trumpet mushrooms, pasta, olive oil, garlic, shallots, white wine, chicken or vegetable broth, heavy cream, parmesan cheese (contains dairy). Allergens: Gluten: Present in pasta; opt for a gluten-free alternative if needed. Dairy: Found in Parmesan cheese; choose a dairy-free substitute if required."
        },

        {
            name: "Pizza Margarita",
            cuisine: "Italian",
            model: 'pizza.glb',
            scale: 0.08,
            rotation: "45 0 0",
            position: "0 0 0",
            desc: "Ingredients: pizza dough, fresh tomatoes, fresh mozzarella cheese, fresh basil, olive oil, garlic, salt and pepper to taste. Allergens: gluten (dough), dairy (cheese)."
        },

        {
            name: "Haddock and Green Beans",
            cuisine: "British",
            model: 'haddock.glb',
            scale: 0.05,
            rotation: "45 0 0",
            position: "0 0 0",
            desc: "Ingredients: Haddock fillets, fresh green beans, olive oil, lemon, garlic, salt and pepper to taste. Allergens: fish (haddock)."
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

        // Hide all the dishes but the selected one
        childArray.forEach(child =>{
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

        model.onload = () => {
            model.components.set('model', dish.model)
        }

        Object.assign(model.style, {
            scale: dish.scale
        })

        document.querySelector("#models").append(model);

        
    });

    document.addEventListener('DOMContentLoaded', function(){
        App.selected = 0;
    });