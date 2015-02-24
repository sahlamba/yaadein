<ul class="list-group user-search">
  <li mentio-menu-item="emoji" ng-repeat="emoji in items" class="list-group-item">
    <img ng-src="{{emoji.imageUrl}}" class="user-photo">
    <span class="text-primary" ng-bind-html="emoji.name | mentioHighlight:typedTerm:'menu-highlighted' | unsafe"></span>
    <em class="text-muted" ng-bind="emoji.bio"></em>
  </li>
</ul>
