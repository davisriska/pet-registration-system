<?php

    namespace App;

    use App\Observers\CreatorObserver;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\SoftDeletes;
    use Illuminate\Support\Facades\Storage;

    /**
     * App\Pet
     *
     * @property int $id
     * @property string $name
     * @property int $user_id
     * @property int $category_id
     * @property int $address_id
     * @property \Illuminate\Support\Carbon|null $created_at
     * @property \Illuminate\Support\Carbon|null $updated_at
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereAddressId($value)
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereCategoryId($value)
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereCreatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereId($value)
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereName($value)
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereUpdatedAt($value)
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereUserId($value)
     * @mixin \Eloquent
     * @property string $image_path
     * @method static \Illuminate\Database\Eloquent\Builder|\App\Pet whereImagePath($value)
     */
    class Pet extends Model {

        use SoftDeletes;

        protected $with     = ['category', 'address'];
        protected $fillable = ['name', 'user_id', 'category_id', 'address_id', 'image_path'];
        protected $appends  = ['image'];

        protected static function boot() {
            parent::boot();

            parent::observe(CreatorObserver::class);
        }

        public function getImageAttribute() {
            $path = Storage::disk('local')->path($this->image_path);
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);

            return 'data:image/' . $type . ';base64,' . base64_encode($data);
        }

        public function category() {
            return $this->belongsTo('App\Category');
        }

        public function address() {
            return $this->belongsTo('App\Address');
        }

    }
