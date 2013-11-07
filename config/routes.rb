Snackoverload::Application.routes.draw do


  devise_for :users

  root to: 'questions#index'
  resources :questions
  resources :tags, only: [:index, :show]


end
