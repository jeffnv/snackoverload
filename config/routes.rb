Snackoverload::Application.routes.draw do
  devise_for :users

  root to: 'questions#index'
  resources :questions, only:[:index]


end
